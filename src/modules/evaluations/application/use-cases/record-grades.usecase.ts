import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Grade } from "../../domain/entities/grade.entity";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";
import { RecordGradesDto } from "../../presentation/dtos/grade.dtos";

@Injectable()
export class RecordGradesUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
  ) {}

  async execute(evaluationId: string, dto: RecordGradesDto): Promise<Grade[]> {
    const evaluation = await this.evaluationsRepo.findEvaluationById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (evaluation.isPublished) {
      throw new BadRequestException('Cannot record grades for a published evaluation');
    }

    const existingGrades = await this.evaluationsRepo.findGradesByEvaluation(evaluationId);
    
    const gradesToSave: Grade[] = [];

    for (const gradeDto of dto.grades) {
      if (gradeDto.score !== undefined && gradeDto.score !== null) {
        if (gradeDto.score < 0) {
          throw new BadRequestException(`Score cannot be negative for student ${gradeDto.studentId}`);
        }
        if (gradeDto.score > evaluation.maxScore) {
          throw new BadRequestException(`Score ${gradeDto.score} exceeds max score ${evaluation.maxScore} for student ${gradeDto.studentId}`);
        }
      }

      const existingGrade = existingGrades.find(g => g.studentId === gradeDto.studentId);
      
      if (existingGrade) {
        existingGrade.update(gradeDto.status, gradeDto.score ?? null, gradeDto.comments ?? null);
        gradesToSave.push(existingGrade);
      } else {
        const newGrade = Grade.create(
          evaluationId,
          gradeDto.studentId,
          gradeDto.status,
          gradeDto.score ?? null,
          gradeDto.comments ?? null,
        );
        gradesToSave.push(newGrade);
      }
    }

    return this.evaluationsRepo.saveGrades(gradesToSave);
  }
}
