import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Evaluation } from "../../domain/entities/evaluation.entity";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";
import { CreateEvaluationDto } from "../../presentation/dtos/evaluation.dtos";

@Injectable()
export class CreateEvaluationUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
  ) {}

  async execute(dto: CreateEvaluationDto): Promise<Evaluation> {
    if (dto.coefficient !== undefined && dto.coefficient <= 0) {
      throw new BadRequestException('Coefficient must be greater than 0');
    }

    const evaluation = Evaluation.create(
      dto.name,
      dto.type,
      dto.subjectId,
      dto.classId,
      dto.termId,
      dto.academicYearId,
      new Date(dto.date),
      dto.maxScore,
      dto.coefficient,
    );
    return this.evaluationsRepo.saveEvaluation(evaluation);
  }
}
