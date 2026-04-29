import { Inject, Injectable } from "@nestjs/common";
import { Evaluation } from "../../domain/entities/evaluation.entity";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";

@Injectable()
export class ListEvaluationsByClassUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
  ) {}

  async execute(classId: string, termId: string): Promise<Evaluation[]> {
    return this.evaluationsRepo.findEvaluationsByClass(classId, termId);
  }
}
