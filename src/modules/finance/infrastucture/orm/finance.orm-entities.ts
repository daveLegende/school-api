import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { UserOrmEntity } from '../../../../modules/users/infrastucture/orm/user.orm-entity';
import { EnrollmentOrmEntity } from '../../../../modules/enrollments/infrastucture/orm/enrollment.orm-entity';
import { SchoolYearOrmEntity } from '../../../../modules/academic-years/infrastucture/orm/school-year.orm-entity';
import { LevelOrmEntity, ClassOrmEntity } from '../../../../modules/academic/infrastucture/orm/academic.orm-entities';
import { PaymentMethod, PaymentStatus, InvoiceStatus } from '../../domain/enums/finance.enums';

@Entity('fee_structures')
export class FeeStructureOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  totalAmount: number;

  @Column()
  numberOfInstallments: number;

  @ManyToOne(() => SchoolYearOrmEntity)
  @JoinColumn({ name: 'academicYearId' })
  academicYear: SchoolYearOrmEntity;

  @Column()
  academicYearId: string;

  @ManyToOne(() => LevelOrmEntity, { nullable: true })
  @JoinColumn({ name: 'levelId' })
  level: LevelOrmEntity;

  @Column({ nullable: true })
  levelId: string;

  @ManyToOne(() => ClassOrmEntity, { nullable: true })
  @JoinColumn({ name: 'classId' })
  class: ClassOrmEntity;

  @Column({ nullable: true })
  classId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('invoices')
@Unique(['studentId', 'academicYearId'])
export class InvoiceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'studentId' })
  student: UserOrmEntity;

  @Column()
  studentId: string;

  @OneToOne(() => EnrollmentOrmEntity)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: EnrollmentOrmEntity;

  @Column()
  enrollmentId: string;

  @ManyToOne(() => FeeStructureOrmEntity)
  @JoinColumn({ name: 'feeStructureId' })
  feeStructure: FeeStructureOrmEntity;

  @Column()
  feeStructureId: string;

  @ManyToOne(() => SchoolYearOrmEntity)
  @JoinColumn({ name: 'academicYearId' })
  academicYear: SchoolYearOrmEntity;

  @Column()
  academicYearId: string;

  @Column('decimal')
  totalAmount: number;

  @Column('decimal', { default: 0 })
  amountPaid: number;

  @Column('decimal')
  remainingAmount: number;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.UNPAID,
  })
  status: InvoiceStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('payments')
export class PaymentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InvoiceOrmEntity)
  @JoinColumn({ name: 'invoiceId' })
  invoice: InvoiceOrmEntity;

  @Column()
  invoiceId: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'studentId' })
  student: UserOrmEntity;

  @Column()
  studentId: string;

  @ManyToOne(() => EnrollmentOrmEntity)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: EnrollmentOrmEntity;

  @Column()
  enrollmentId: string;

  @Column('decimal')
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.SUCCESS,
  })
  status: PaymentStatus;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'recordedById' })
  recordedBy: UserOrmEntity;

  @Column()
  recordedById: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('receipts')
export class ReceiptOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PaymentOrmEntity)
  @JoinColumn({ name: 'paymentId' })
  payment: PaymentOrmEntity;

  @Column()
  paymentId: string;

  @Column({ unique: true })
  receiptNumber: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'generatedById' })
  generatedBy: UserOrmEntity;

  @Column()
  generatedById: string;

  @CreateDateColumn()
  generatedAt: Date;
}
