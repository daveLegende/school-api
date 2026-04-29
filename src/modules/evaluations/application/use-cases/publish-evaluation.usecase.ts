import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Evaluation } from "../../domain/entities/evaluation.entity";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";

@Injectable()
export class PublishEvaluationUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
  ) {}

  async execute(evaluationId: string): Promise<Evaluation> {
    const evaluation = await this.evaluationsRepo.findEvaluationById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    evaluation.publish();
    return this.evaluationsRepo.saveEvaluation(evaluation);
  }
}
