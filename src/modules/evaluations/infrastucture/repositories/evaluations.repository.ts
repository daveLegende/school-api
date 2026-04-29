import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { EvaluationsRepository } from "../../domain/repositories/evaluations.repository.interfaces";
import { Term } from "../../domain/entities/term.entity";
import { Evaluation } from "../../domain/entities/evaluation.entity";
import { Grade } from "../../domain/entities/grade.entity";
import { 
  TermOrmEntity, 
  EvaluationOrmEntity, 
  GradeOrmEntity 
} from "../orm/evaluations.orm-entities";

@Injectable()
export class TypeOrmEvaluationsRepository implements EvaluationsRepository {
  constructor(
    @InjectRepository(TermOrmEntity)
    private termRepo: Repository<TermOrmEntity>,
    @InjectRepository(EvaluationOrmEntity)
    private evaluationRepo: Repository<EvaluationOrmEntity>,
    @InjectRepository(GradeOrmEntity)
    private gradeRepo: Repository<GradeOrmEntity>,
  ) {}

  // Terms
  async saveTerm(term: Term): Promise<Term> {
    const entity = this.termRepo.create({
      id: term.id ?? undefined,
      name: term.name,
      order: term.order,
      academicYearId: term.academicYearId,
    });
    const saved = await this.termRepo.save(entity);
    return new Term(saved.id, saved.name, saved.order, saved.academicYearId);
  }

  async findTermById(id: string): Promise<Term | null> {
    const entity = await this.termRepo.findOne({ where: { id } });
    return entity ? new Term(entity.id, entity.name, entity.order, entity.academicYearId) : null;
  }

  async findTermsByAcademicYear(academicYearId: string): Promise<Term[]> {
    const entities = await this.termRepo.find({ where: { academicYearId }, order: { order: 'ASC' } });
    return entities.map(e => new Term(e.id, e.name, e.order, e.academicYearId));
  }

  // Evaluations
  async saveEvaluation(evaluation: Evaluation): Promise<Evaluation> {
    const entity = this.evaluationRepo.create({
      id: evaluation.id ?? undefined,
      name: evaluation.name,
      type: evaluation.type,
      subjectId: evaluation.subjectId,
      classId: evaluation.classId,
      termId: evaluation.termId,
      academicYearId: evaluation.academicYearId,
      date: evaluation.date,
      maxScore: evaluation.maxScore,
      coefficient: evaluation.coefficient,
      isPublished: evaluation.isPublished,
    });
    const saved = await this.evaluationRepo.save(entity);
    return new Evaluation(
      saved.id,
      saved.name,
      saved.type,
      saved.subjectId,
      saved.classId,
      saved.termId,
      saved.academicYearId,
      saved.date,
      saved.maxScore,
      saved.coefficient,
      saved.isPublished,
    );
  }

  async findEvaluationById(id: string): Promise<Evaluation | null> {
    const entity = await this.evaluationRepo.findOne({ where: { id } });
    if (!entity) return null;
    return new Evaluation(
      entity.id,
      entity.name,
      entity.type,
      entity.subjectId,
      entity.classId,
      entity.termId,
      entity.academicYearId,
      entity.date,
      entity.maxScore,
      entity.coefficient,
      entity.isPublished,
    );
  }

  async findEvaluationsByIds(ids: string[]): Promise<Evaluation[]> {
    if (ids.length === 0) return [];
    const entities = await this.evaluationRepo.find({
      where: { id: In(ids) }
    });
    return entities.map(entity => new Evaluation(
      entity.id,
      entity.name,
      entity.type,
      entity.subjectId,
      entity.classId,
      entity.termId,
      entity.academicYearId,
      entity.date,
      entity.maxScore,
      entity.coefficient,
      entity.isPublished,
    ));
  }

  async findEvaluationsByClass(classId: string, termId: string): Promise<Evaluation[]> {
    const entities = await this.evaluationRepo.find({ where: { classId, termId } });
    return entities.map(e => new Evaluation(
      e.id, e.name, e.type, e.subjectId, e.classId, e.termId, e.academicYearId, e.date, e.maxScore, e.coefficient, e.isPublished
    ));
  }

  async findEvaluationsByAcademicYear(academicYearId: string): Promise<Evaluation[]> {
    const entities = await this.evaluationRepo.find({ where: { academicYearId } });
    return entities.map(e => new Evaluation(
      e.id, e.name, e.type, e.subjectId, e.classId, e.termId, e.academicYearId, e.date, e.maxScore, e.coefficient, e.isPublished
    ));
  }

  // Grades
  async saveGrade(grade: Grade): Promise<Grade> {
    const entity = this.gradeRepo.create({
      id: grade.id ?? undefined,
      evaluationId: grade.evaluationId,
      studentId: grade.studentId,
      status: grade.status,
      score: grade.score,
      comments: grade.comments,
    });
    const saved = await this.gradeRepo.save(entity);
    return new Grade(saved.id, saved.evaluationId, saved.studentId, saved.status, saved.score, saved.comments);
  }

  async saveGrades(grades: Grade[]): Promise<Grade[]> {
    const entities = grades.map(grade => this.gradeRepo.create({
      id: grade.id ?? undefined,
      evaluationId: grade.evaluationId,
      studentId: grade.studentId,
      status: grade.status,
      score: grade.score,
      comments: grade.comments,
    }));
    const saved = await this.gradeRepo.save(entities);
    return saved.map(s => new Grade(s.id, s.evaluationId, s.studentId, s.status, s.score, s.comments));
  }

  async findGradesByEvaluation(evaluationId: string): Promise<Grade[]> {
    const entities = await this.gradeRepo.find({ where: { evaluationId } });
    return entities.map(e => new Grade(e.id, e.evaluationId, e.studentId, e.status, e.score, e.comments));
  }

  async findGradesByStudentAndTerm(studentId: string, termId: string): Promise<Grade[]> {
    const entities = await this.gradeRepo.find({
      where: {
        studentId,
        evaluation: {
          termId
        }
      },
      relations: ['evaluation']
    });
    return entities.map(e => new Grade(e.id, e.evaluationId, e.studentId, e.status, e.score, e.comments));
  }

  async findGradeByStudentAndEvaluation(studentId: string, evaluationId: string): Promise<Grade | null> {
    const entity = await this.gradeRepo.findOne({ where: { studentId, evaluationId } });
    return entity ? new Grade(entity.id, entity.evaluationId, entity.studentId, entity.status, entity.score, entity.comments) : null;
  }
}
