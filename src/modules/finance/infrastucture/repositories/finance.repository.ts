import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FinanceRepository } from "../../domain/repositories/finance.repository.interface";
import { FeeStructure } from "../../domain/entities/fee-structure.entity";
import { Invoice } from "../../domain/entities/invoice.entity";
import { Payment } from "../../domain/entities/payment.entity";
import { Receipt } from "../../domain/entities/receipt.entity";
import { 
  FeeStructureOrmEntity, 
  InvoiceOrmEntity, 
  PaymentOrmEntity, 
  ReceiptOrmEntity 
} from "../orm/finance.orm-entities";

@Injectable()
export class TypeOrmFinanceRepository implements FinanceRepository {
  constructor(
    @InjectRepository(FeeStructureOrmEntity)
    private feeRepo: Repository<FeeStructureOrmEntity>,
    @InjectRepository(InvoiceOrmEntity)
    private invoiceRepo: Repository<InvoiceOrmEntity>,
    @InjectRepository(PaymentOrmEntity)
    private paymentRepo: Repository<PaymentOrmEntity>,
    @InjectRepository(ReceiptOrmEntity)
    private receiptRepo: Repository<ReceiptOrmEntity>,
  ) {}

  // FeeStructure
  async saveFeeStructure(fee: FeeStructure): Promise<FeeStructure> {
    const entity = this.feeRepo.create({
      id: fee.id ?? undefined,
      name: fee.name,
      totalAmount: fee.totalAmount,
      numberOfInstallments: fee.numberOfInstallments,
      academicYearId: fee.academicYearId,
      levelId: fee.levelId ?? undefined,
      classId: fee.classId ?? undefined,
    });
    const saved = await this.feeRepo.save(entity);
    return new FeeStructure(
      saved.id, saved.name, Number(saved.totalAmount), saved.numberOfInstallments, 
      saved.academicYearId, saved.levelId, saved.classId, saved.createdAt, saved.updatedAt
    );
  }

  async findFeeStructureById(id: string): Promise<FeeStructure | null> {
    const entity = await this.feeRepo.findOne({ where: { id } });
    if (!entity) return null;
    return new FeeStructure(
      entity.id, entity.name, Number(entity.totalAmount), entity.numberOfInstallments, 
      entity.academicYearId, entity.levelId, entity.classId, entity.createdAt, entity.updatedAt
    );
  }

  async findFeeStructureForClass(classId: string, academicYearId: string): Promise<FeeStructure | null> {
    const entity = await this.feeRepo.findOne({ where: { classId, academicYearId } });
    if (!entity) return null;
    return new FeeStructure(
      entity.id, entity.name, Number(entity.totalAmount), entity.numberOfInstallments, 
      entity.academicYearId, entity.levelId, entity.classId, entity.createdAt, entity.updatedAt
    );
  }

  async findFeeStructureForLevel(levelId: string, academicYearId: string): Promise<FeeStructure | null> {
    const entity = await this.feeRepo.findOne({ where: { levelId, academicYearId } });
    if (!entity) return null;
    return new FeeStructure(
      entity.id, entity.name, Number(entity.totalAmount), entity.numberOfInstallments, 
      entity.academicYearId, entity.levelId, entity.classId, entity.createdAt, entity.updatedAt
    );
  }

  async findAllFeeStructures(): Promise<FeeStructure[]> {
    const entities = await this.feeRepo.find();
    return entities.map(e => new FeeStructure(
      e.id, e.name, Number(e.totalAmount), e.numberOfInstallments, 
      e.academicYearId, e.levelId, e.classId, e.createdAt, e.updatedAt
    ));
  }

  // Invoice
  async saveInvoice(invoice: Invoice): Promise<Invoice> {
    const entity = this.invoiceRepo.create({
      id: invoice.id ?? undefined,
      studentId: invoice.studentId,
      enrollmentId: invoice.enrollmentId,
      feeStructureId: invoice.feeStructureId,
      academicYearId: invoice.academicYearId,
      totalAmount: invoice.totalAmount,
      amountPaid: invoice.amountPaid,
      remainingAmount: invoice.remainingAmount,
      status: invoice.status,
      dueDate: invoice.dueDate ?? undefined,
    });
    const saved = await this.invoiceRepo.save(entity);
    return new Invoice(
      saved.id, saved.studentId, saved.enrollmentId, saved.feeStructureId, 
      saved.academicYearId, Number(saved.totalAmount), Number(saved.amountPaid), 
      Number(saved.remainingAmount), saved.status, saved.dueDate, saved.createdAt, saved.updatedAt
    );
  }

  async findInvoiceById(id: string): Promise<Invoice | null> {
    const entity = await this.invoiceRepo.findOne({ where: { id } });
    if (!entity) return null;
    return new Invoice(
      entity.id, entity.studentId, entity.enrollmentId, entity.feeStructureId, 
      entity.academicYearId, Number(entity.totalAmount), Number(entity.amountPaid), 
      Number(entity.remainingAmount), entity.status, entity.dueDate, entity.createdAt, entity.updatedAt
    );
  }

  async findInvoiceByStudentAndYear(studentId: string, academicYearId: string): Promise<Invoice | null> {
    const entity = await this.invoiceRepo.findOne({ where: { studentId, academicYearId } });
    if (!entity) return null;
    return new Invoice(
      entity.id, entity.studentId, entity.enrollmentId, entity.feeStructureId, 
      entity.academicYearId, Number(entity.totalAmount), Number(entity.amountPaid), 
      Number(entity.remainingAmount), entity.status, entity.dueDate, entity.createdAt, entity.updatedAt
    );
  }

  async findInvoicesByStudent(studentId: string): Promise<Invoice[]> {
    const entities = await this.invoiceRepo.find({ where: { studentId } });
    return entities.map(e => new Invoice(
      e.id, e.studentId, e.enrollmentId, e.feeStructureId, e.academicYearId, 
      Number(e.totalAmount), Number(e.amountPaid), Number(e.remainingAmount), 
      e.status, e.dueDate, e.createdAt, e.updatedAt
    ));
  }

  // Payment
  async savePayment(payment: Payment): Promise<Payment> {
    const entity = this.paymentRepo.create({
      id: payment.id ?? undefined,
      invoiceId: payment.invoiceId,
      studentId: payment.studentId,
      enrollmentId: payment.enrollmentId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      recordedById: payment.recordedBy,
      reference: payment.reference ?? undefined,
      paidAt: payment.paidAt,
    });
    const saved = await this.paymentRepo.save(entity);
    return new Payment(
      saved.id, saved.invoiceId, saved.studentId, saved.enrollmentId, Number(saved.amount), 
      saved.method, saved.status, saved.recordedById, saved.reference, saved.paidAt, 
      saved.createdAt, saved.updatedAt
    );
  }

  async findPaymentById(id: string): Promise<Payment | null> {
    const entity = await this.paymentRepo.findOne({ where: { id } });
    if (!entity) return null;
    return new Payment(
      entity.id, entity.invoiceId, entity.studentId, entity.enrollmentId, Number(entity.amount), 
      entity.method, entity.status, entity.recordedById, entity.reference, entity.paidAt, 
      entity.createdAt, entity.updatedAt
    );
  }

  async findPaymentsByInvoice(invoiceId: string): Promise<Payment[]> {
    const entities = await this.paymentRepo.find({ where: { invoiceId }, order: { paidAt: 'DESC' } });
    return entities.map(e => new Payment(
      e.id, e.invoiceId, e.studentId, e.enrollmentId, Number(e.amount), e.method, 
      e.status, e.recordedById, e.reference, e.paidAt, e.createdAt, e.updatedAt
    ));
  }

  async findPaymentsByStudent(studentId: string): Promise<Payment[]> {
    const entities = await this.paymentRepo.find({ where: { studentId }, order: { paidAt: 'DESC' } });
    return entities.map(e => new Payment(
      e.id, e.invoiceId, e.studentId, e.enrollmentId, Number(e.amount), e.method, 
      e.status, e.recordedById, e.reference, e.paidAt, e.createdAt, e.updatedAt
    ));
  }

  // Receipt
  async saveReceipt(receipt: Receipt): Promise<Receipt> {
    const entity = this.receiptRepo.create({
      id: receipt.id ?? undefined,
      paymentId: receipt.paymentId,
      receiptNumber: receipt.receiptNumber,
      generatedById: receipt.generatedBy,
    });
    const saved = await this.receiptRepo.save(entity);
    return new Receipt(saved.id, saved.paymentId, saved.receiptNumber, saved.generatedById, saved.generatedAt);
  }

  async findReceiptByPayment(paymentId: string): Promise<Receipt | null> {
    const entity = await this.receiptRepo.findOne({ where: { paymentId } });
    if (!entity) return null;
    return new Receipt(entity.id, entity.paymentId, entity.receiptNumber, entity.generatedById, entity.generatedAt);
  }

  async findLastReceiptNumber(): Promise<string | null> {
    const last = await this.receiptRepo.findOne({
      where: {},
      order: { generatedAt: 'DESC' }
    });
    return last ? last.receiptNumber : null;
  }
}
