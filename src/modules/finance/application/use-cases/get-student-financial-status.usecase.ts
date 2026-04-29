import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { FinanceRepository } from "../../domain/repositories/finance.repository.interface";

@Injectable()
export class GetStudentFinancialStatusUseCase {
  constructor(
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
  ) {}

  async execute(studentId: string) {
    const invoices = await this.financeRepo.findInvoicesByStudent(studentId);
    
    // For now, we take the most recent invoice or return all.
    // The requirement says "returns: totalAmount, amountPaid, remainingAmount, list of payments, invoice status"
    // Usually, this is per academic year. We'll return the list of all invoices with their payments.
    
    const results = await Promise.all(invoices.map(async (invoice) => {
      const payments = await this.financeRepo.findPaymentsByInvoice(invoice.id!);
      return {
        invoiceId: invoice.id,
        academicYearId: invoice.academicYearId,
        feeStructureId: invoice.feeStructureId,
        totalAmount: invoice.totalAmount,
        amountPaid: invoice.amountPaid,
        remainingAmount: invoice.remainingAmount,
        status: invoice.status,
        payments: payments.map(p => ({
          id: p.id,
          amount: p.amount,
          method: p.method,
          status: p.status,
          paidAt: p.paidAt,
          reference: p.reference
        }))
      };
    }));

    return results;
  }
}
