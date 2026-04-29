import { Inject, Injectable } from "@nestjs/common";
import { Term } from "../../domain/entities/term.entity";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";
import { CreateTermDto } from "../../presentation/dtos/term.dtos";

@Injectable()
export class CreateTermUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
  ) {}

  async execute(dto: CreateTermDto): Promise<Term> {
    const term = Term.create(dto.name, dto.order, dto.academicYearId);
    return this.evaluationsRepo.saveTerm(term);
  }
}
