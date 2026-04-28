import { Inject, Injectable } from "@nestjs/common";
import type { BranchRepository } from "../../domain/repositories/branch.repository.interface";

@Injectable()
export class GetBranchesUseCase {
  constructor(
    @Inject('BranchRepository') private branchRepo: BranchRepository,
  ) {}

  async execute() {
    return this.branchRepo.findAll();
  }
}
