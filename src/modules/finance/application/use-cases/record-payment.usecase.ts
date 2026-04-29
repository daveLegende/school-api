import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Payment } from "../../domain/entities/payment.entity";
import type { FinanceRepository } from "../../domain/repositories/finance.repository.interface";
import { RecordPaymentDto } from "../../presentation/dtos/finance.dtos";
import { GenerateReceiptUseCase } from "./generate-receipt.usecase";

@Injectable()
export class RecordPaymentUseCase {
  constructor(
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
    private generateReceiptUseCase: GenerateReceiptUseCase,
  ) {}

  async execute(dto: RecordPaymentDto, recordedBy: string): Promise<Payment> {
    // 1. Retrieve Student Invoice
    // We need the invoice for the enrollment. Ideally, we find by enrollmentId.
    // I'll add findInvoiceByEnrollment to the repository or use a general find.
    const invoices = await this.financeRepo.findInvoicesByStudent(dto.studentId);
    const invoice = invoices.find(inv => inv.enrollmentId === dto.enrollmentId);

    if (!invoice) {
      throw new NotFoundException('No active invoice found for this student enrollment');
    }

    // 2. Business Logic: Update Invoice
    try {
      invoice.recordPayment(dto.amount);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // 3. Create Payment Record
    const payment = Payment.create(
      invoice.id!,
      dto.studentId,
      dto.enrollmentId,
      dto.amount,
      dto.method,
      recordedBy,
      dto.reference
    );

    // 4. Save Invoice and Payment
    await this.financeRepo.saveInvoice(invoice);
    const savedPayment = await this.financeRepo.savePayment(payment);

    // 5. Generate Receipt
    await this.generateReceiptUseCase.execute(savedPayment.id!, recordedBy);

    return savedPayment;
  }
}
