import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('student_profiles')
export class StudentProfileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ unique: true })
  matricule: string;

  @Column()
  classId: string;

  @Column()
  branchId: string;
}

@Entity('professor_profiles')
export class ProfessorProfileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  speciality: string;

  @Column()
  branchId: string;
}

@Entity('parent_profiles')
export class ParentProfileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

@Entity('staff_profiles')
export class StaffProfileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  position: string;

  @Column()
  branchId: string;
}
