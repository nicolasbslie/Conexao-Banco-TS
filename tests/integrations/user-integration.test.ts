import { conexao } from '../../src/config/database'
import { UserRepository } from '../../src/repositories/user_repo'

describe("Testes de integração de usuários", () => {
const repo = new UserRepository()

    beforeAll(async() => {

        await conexao.execute('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE);')
    })

    beforeEach(async () => {
        await conexao.execute('DELETE FROM users;')
    })

    test("Deve criar um usuário", async () => {
        const user = await repo.inserir("Daniel", "teste@gmail.com")

        expect(user).not.toBeNull()
        expect(user.id).not.toBeNull()
        expect(user.nome).toBe("Daniel")
        expect(user.email).toBe("teste@gmail.com")
    })

    test("Deve criar dois usuários e exibir todos", async() => {
        const user1 = await repo.inserir("Nicolas", "abc@gmail.com")
        expect(user1).not.toBeNull()
        expect(user1.id).not.toBeNull()
        expect(user1.nome).toBe("Nicolas")
        expect(user1.email).toBe("abc@gmail.com")

        const user2 = await repo.inserir("Henry", "def@gmail.com")
        expect(user2).not.toBeNull()
        expect(user2.id).not.toBeNull()
        expect(user2.nome).toBe("Henry")
        expect(user2.email).toBe("def@gmail.com")

        expect((await repo.mostrarTodos()).length)

        const users = await repo.mostrarTodos()
        expect(users[0].nome).toBe("Nicolas")
        expect(users[1].nome).toBe("Henry")
    })

    afterAll(async() => {
        await conexao.end()
    })
})