import { UserRepository } from "../../domain/repositories/user.repository.interface";

export class GetUserByEmailUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string) {
    return this.userRepo.findByEmail(email);
  }
}