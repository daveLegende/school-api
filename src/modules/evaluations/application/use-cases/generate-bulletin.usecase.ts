import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";
import type { AcademicRepository } from "../../../academic/domain/repositories/academic.repository.interfaces";
import type { ProfileRepository } from "../../../users/domain/repositories/profile.repository.interface";
import { BulletinOutput, SubjectBulletinEntry } from "../../presentation/dtos/bulletin.dtos";
import { GradeStatus } from "../../domain/enums/grade-status.enum";

import { AbsencePolicy } from "../../../settings/domain/enums/absence-policy.enum";
import { SettingsService } from "../../../settings/application/use-cases/settings.service";

@Injectable()
export class GenerateBulletinUseCase {
  constructor(
    @Inject('EvaluationsRepository') private evaluationsRepo: EvaluationsRepository,
    @Inject('AcademicRepository') private academicRepo: AcademicRepository,
    @Inject('ProfileRepository') private profileRepo: ProfileRepository,
    private settingsService: SettingsService,
  ) {}

  async execute(studentId: string, termId: string): Promise<BulletinOutput> {
    const term = await this.evaluationsRepo.findTermById(termId);
    if (!term) throw new NotFoundException('Term not found');

    const studentProfile = await this.profileRepo.findStudentByUserId(studentId);
    const studentName = studentProfile 
      ? `${studentProfile.firstName} ${studentProfile.lastName}` 
      : 'Unknown Student';

    const grades = await this.evaluationsRepo.findGradesByStudentAndTerm(studentId, termId);
    
    if (grades.length === 0) {
      return {
        studentId,
        studentName,
        termId: term.id!,
        termName: term.name,
        academicYearId: term.academicYearId,
        subjects: [],
        totalPoints: 0,
        totalCoefficients: 0,
        overallAverage: null,
        average: null,
        rank: null,
      };
    }

    const evaluationIds = Array.from(new Set(grades.map(g => g.evaluationId)));
    const evaluations = await this.evaluationsRepo.findEvaluationsByIds(evaluationIds);
    const evaluationMap = new Map(evaluations.map(e => [e.id, e]));

    const subjectIds = Array.from(new Set(evaluations.map(e => e.subjectId)));
    const subjectsBulk = await this.academicRepo.findSubjectsByIds(subjectIds);
    const subjectMap = new Map(subjectsBulk.map(s => [s.id, s]));

    const subjectEntriesMap = new Map<string, SubjectBulletinEntry>();

    for (const grade of grades) {
      const evaluation = evaluationMap.get(grade.evaluationId);
      if (!evaluation) continue;

      let entry = subjectEntriesMap.get(evaluation.subjectId);
      if (!entry) {
        const subject = subjectMap.get(evaluation.subjectId);
        entry = {
          subjectId: evaluation.subjectId,
          subjectName: subject?.name || 'Unknown',
          coefficient: subject?.coefficient || 1,
          evaluations: [],
          subjectAverage: 0,
          weightedAverage: 0,
        };
        subjectEntriesMap.set(evaluation.subjectId, entry);
      }

      entry.evaluations.push({
        evaluationId: evaluation.id!,
        evaluationName: evaluation.name,
        type: evaluation.type,
        score: grade.score,
        maxScore: evaluation.maxScore,
        coefficient: evaluation.coefficient,
        status: grade.status,
      });
    }

    let totalWeightedPoints = 0;
    let totalSubjectCoefficients = 0;

    const subjects = Array.from(subjectEntriesMap.values());

    /**
     * PERFORMANCE CONSIDERATION:
     * We use bulk queries (EvaluationsRepository.findEvaluationsByIds and AcademicRepository.findSubjectsByIds)
     * to avoid N+1 issues. For massive scale, results could be cached at the Term level
     * or precomputed whenever a Grade is recorded/published.
     */
    const settings = await this.settingsService.getSettings();
    const absencePolicy = settings.absencePolicy;

    /**
     * WEIGHTING STRATEGY:
     * 1. Evaluation Weighted Score: (Raw Score / Max Score) * 20 * Evaluation Coefficient
     * 2. Subject Average: Sum of Evaluation Weighted Scores / Sum of Evaluation Coefficients
     * 3. Overall Average: Sum of (Subject Average * Subject Coefficient) / Sum of Subject Coefficients
     */

    for (const subject of subjects) {
      let subjectTotalScore = 0;
      let subjectTotalEvalCoeff = 0;

      for (const evalGrade of subject.evaluations) {
        /**
         * ABSENCE POLICY LOGIC:
         * - PRESENT: Calculate score normally.
         * - ABSENT/EXCUSED:
         *    - If policy is 'ZERO' -> Treat as 0/20 and include in average.
         *    - If policy is 'IGNORE' -> Exclude this evaluation from the average calculations.
         */
        let effectiveScore: number | null = null;
        let shouldInclude = false;

        if (evalGrade.status === GradeStatus.PRESENT && evalGrade.score !== null) {
          effectiveScore = evalGrade.score;
          shouldInclude = true;
        } else if (absencePolicy === AbsencePolicy.ZERO) {
          effectiveScore = 0; // Treat absence as zero
          shouldInclude = true;
        }

        if (shouldInclude && effectiveScore !== null) {
          /**
           * SCORE NORMALIZATION SAFETY:
           * We normalize the score to a 20-point scale for calculation purposes ONLY.
           * Raw scores remain untouched in the database and are returned as-is in the response.
           */
          const normalizedScore = (effectiveScore / evalGrade.maxScore) * 20;
          subjectTotalScore += normalizedScore * evalGrade.coefficient;
          subjectTotalEvalCoeff += evalGrade.coefficient;
        }
      }

      if (subjectTotalEvalCoeff > 0) {
        subject.subjectAverage = subjectTotalScore / subjectTotalEvalCoeff;
        subject.weightedAverage = subject.subjectAverage * subject.coefficient;
        totalWeightedPoints += subject.weightedAverage;
        totalSubjectCoefficients += subject.coefficient;
      } else {
        subject.subjectAverage = null;
        subject.weightedAverage = null;
      }
    }

    const overallAverage = totalSubjectCoefficients > 0 
      ? totalWeightedPoints / totalSubjectCoefficients 
      : null;

    return {
      studentId,
      studentName,
      termId: term.id!,
      termName: term.name,
      academicYearId: term.academicYearId,
      subjects,
      totalPoints: totalWeightedPoints,
      totalCoefficients: totalSubjectCoefficients,
      overallAverage,
      average: overallAverage,
      rank: null, // Placeholder for future ranking implementation
    };
  }
}
