import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EnrollmentStatus } from '../../domain/entities/enrollment.entity';
import { UserOrmEntity } from '../../../users/infrastucture/orm/user.orm-entity';
import { ClassOrmEntity } from '../../../academic/infrastucture/orm/academic.orm-entities';
import { SchoolYearOrmEntity } from '../../../academic-years/infrastucture/orm/school-year.orm-entity';

@Entity('enrollments')
export class EnrollmentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'studentId' })
  student: UserOrmEntity;

  @Column()
  studentId: string;

  @ManyToOne(() => ClassOrmEntity)
  @JoinColumn({ name: 'classId' })
  classe: ClassOrmEntity;

  @Column()
  classId: string;

  @ManyToOne(() => SchoolYearOrmEntity)
  @JoinColumn({ name: 'schoolYearId' })
  schoolYear: SchoolYearOrmEntity;

  @Column()
  schoolYearId: string;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ENROLLED
  })
  status: EnrollmentStatus;

  @CreateDateColumn()
  enrolledAt: Date;
}
