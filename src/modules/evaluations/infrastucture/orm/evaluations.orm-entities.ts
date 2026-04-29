import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { SchoolYearOrmEntity } from '../../../../modules/academic-years/infrastucture/orm/school-year.orm-entity';
import { SubjectOrmEntity, ClassOrmEntity } from '../../../../modules/academic/infrastucture/orm/academic.orm-entities';
import { UserOrmEntity } from '../../../../modules/users/infrastucture/orm/user.orm-entity';
import { EvaluationType } from '../../domain/enums/evaluation-type.enum';
import { GradeStatus } from '../../domain/enums/grade-status.enum';

@Entity('terms')
@Unique(['academicYearId', 'order'])
export class TermOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => SchoolYearOrmEntity)
  @JoinColumn({ name: 'academicYearId' })
  academicYear: SchoolYearOrmEntity;

  @Column()
  academicYearId: string;
}

@Entity('evaluations')
export class EvaluationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: EvaluationType,
  })
  type: EvaluationType;

  @ManyToOne(() => SubjectOrmEntity)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectOrmEntity;

  @Column()
  subjectId: string;

  @ManyToOne(() => ClassOrmEntity)
  @JoinColumn({ name: 'classId' })
  class: ClassOrmEntity;

  @Column()
  classId: string;

  @ManyToOne(() => TermOrmEntity)
  @JoinColumn({ name: 'termId' })
  term: TermOrmEntity;

  @Column()
  termId: string;

  @ManyToOne(() => SchoolYearOrmEntity)
  @JoinColumn({ name: 'academicYearId' })
  academicYear: SchoolYearOrmEntity;

  @Column()
  academicYearId: string;

  @Column()
  date: Date;

  @Column('decimal')
  maxScore: number;

  @Column('decimal')
  coefficient: number;

  @Column({ default: false })
  isPublished: boolean;

  @OneToMany(() => GradeOrmEntity, (grade) => grade.evaluation)
  grades: GradeOrmEntity[];
}

@Entity('grades')
@Unique(['evaluationId', 'studentId'])
export class GradeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EvaluationOrmEntity, (evaluation) => evaluation.grades)
  @JoinColumn({ name: 'evaluationId' })
  evaluation: EvaluationOrmEntity;

  @Column()
  evaluationId: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'studentId' })
  student: UserOrmEntity;

  @Column()
  studentId: string;

  @Column({
    type: 'enum',
    enum: GradeStatus,
    default: GradeStatus.PRESENT,
  })
  status: GradeStatus;

  @Column('decimal', { nullable: true })
  score: number | null;

  @Column({ type: 'text', nullable: true })
  comments: string | null;
}
