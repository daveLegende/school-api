import { Inject, Injectable } from "@nestjs/common";
import { Branch } from "../../domain/entities/branch.entity";
import type { BranchRepository } from "../../domain/repositories/branch.repository.interface";
import { CreateBranchDto } from "../../presentation/dtos/create-branch.dto";

@Injectable()
export class CreateBranchUseCase {
  constructor(
    @Inject('BranchRepository') private branchRepo: BranchRepository,
  ) {}

  async execute(dto: CreateBranchDto): Promise<Branch> {
    const branch = Branch.create(dto.name, dto.city);
    return this.branchRepo.save(branch);
  }
}
