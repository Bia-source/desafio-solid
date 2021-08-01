import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExist = this.usersRepository.findById(user_id);
    const userIsAdmin = userExist.admin;
    if (!userExist) {
      throw new Error("Este usuario nao existe");
    }
    if (!userIsAdmin) {
      throw new Error(
        "Este usuario nao é um administrador para acessar essa informação"
      );
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
