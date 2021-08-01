/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser: User = new User();
    Object.assign(newUser, {
      name,
      admin: false,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((res) => res.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((res) => res.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    Object.assign(receivedUser, {
      admin: true,
      updated_at: new Date(),
    });
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
