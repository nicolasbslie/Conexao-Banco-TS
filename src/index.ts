import { UserRepository } from "./repositories/user_repo";

async function main() {
    const userRepo = new UserRepository()

    console.log(await userRepo.inserir("Nicolas", "abc@gmail.com"))
    console.log(await userRepo.inserir("Henrique", "def@gmail.com"))
    console.log("---------------------------")
    console.log(await userRepo.mostrarTodos())
}

main()