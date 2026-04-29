import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { FeeStructure } from "../../domain/entities/fee-structure.entity";
import type { FinanceRepository } from "../../domain/repositories/finance.repository.interface";
import { CreateFeeStructureDto } from "../../presentation/dtos/finance.dtos";

@Injectable()
export class CreateFeeStructureUseCase {
  constructor(
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
  ) {}

  async execute(dto: CreateFeeStructureDto): Promise<FeeStructure> {
    if (!dto.levelId && !dto.classId) {
      throw new BadRequestException('Fee structure must be linked to a Level or a Class');
    }

    const fee = FeeStructure.create(
      dto.name,
      dto.totalAmount,
      dto.numberOfInstallments,
      dto.academicYearId,
      dto.levelId,
      dto.classId,
    );

    return this.financeRepo.saveFeeStructure(fee);
  }
}
