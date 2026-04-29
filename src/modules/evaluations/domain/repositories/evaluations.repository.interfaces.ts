import { Term } from "../entities/term.entity";
import { Evaluation } from "../entities/evaluation.entity";
import { Grade } from "../entities/grade.entity";

export interface EvaluationsRepository {
  // Terms
  saveTerm(term: Term): Promise<Term>;
  findTermById(id: string): Promise<Term | null>;
  findTermsByAcademicYear(academicYearId: string): Promise<Term[]>;

  // Evaluations
  saveEvaluation(evaluation: Evaluation): Promise<Evaluation>;
  findEvaluationById(id: string): Promise<Evaluation | null>;
  findEvaluationsByIds(ids: string[]): Promise<Evaluation[]>;
  findEvaluationsByClass(classId: string, termId: string): Promise<Evaluation[]>;
  findEvaluationsByAcademicYear(academicYearId: string): Promise<Evaluation[]>;

  // Grades
  saveGrade(grade: Grade): Promise<Grade>;
  saveGrades(grades: Grade[]): Promise<Grade[]>;
  findGradesByEvaluation(evaluationId: string): Promise<Grade[]>;
  findGradesByStudentAndTerm(studentId: string, termId: string): Promise<Grade[]>;
  findGradeByStudentAndEvaluation(studentId: string, evaluationId: string): Promise<Grade | null>;
}
