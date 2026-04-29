import { Inject, Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { Invoice } from "../../domain/entities/invoice.entity";
import type { FinanceRepository } from "../../domain/repositories/finance.repository.interface";
import type { AcademicRepository } from "../../../academic/domain/repositories/academic.repository.interfaces";

@Injectable()
export class GenerateInvoiceUseCase {
  constructor(
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
    @Inject('AcademicRepository') private academicRepo: AcademicRepository,
  ) {}

  async execute(studentId: string, enrollmentId: string, classId: string, academicYearId: string): Promise<Invoice> {
    // 1. Check if invoice already exists for this year
    const existing = await this.financeRepo.findInvoiceByStudentAndYear(studentId, academicYearId);
    if (existing) {
      throw new ConflictException('Invoice already exists for this student and academic year');
    }

    // 2. Find appropriate FeeStructure (Class first, then Level)
    let feeStructure = await this.financeRepo.findFeeStructureForClass(classId, academicYearId);
    
    if (!feeStructure) {
      const classe = await this.academicRepo.findClassById(classId);
      if (classe) {
        feeStructure = await this.financeRepo.findFeeStructureForLevel(classe.levelId, academicYearId);
      }
    }

    if (!feeStructure) {
      throw new NotFoundException('No fee structure found for this class or level');
    }

    // 3. Create Invoice
    const invoice = Invoice.create(
      studentId,
      enrollmentId,
      feeStructure.id!,
      academicYearId,
      feeStructure.totalAmount
    );

    return this.financeRepo.saveInvoice(invoice);
  }
}
