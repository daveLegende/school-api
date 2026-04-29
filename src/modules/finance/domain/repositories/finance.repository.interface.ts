import { FeeStructure } from "../entities/fee-structure.entity";
import { Invoice } from "../entities/invoice.entity";
import { Payment } from "../entities/payment.entity";
import { Receipt } from "../entities/receipt.entity";

export interface FinanceRepository {
  // FeeStructure
  saveFeeStructure(fee: FeeStructure): Promise<FeeStructure>;
  findFeeStructureById(id: string): Promise<FeeStructure | null>;
  findFeeStructureForClass(classId: string, academicYearId: string): Promise<FeeStructure | null>;
  findFeeStructureForLevel(levelId: string, academicYearId: string): Promise<FeeStructure | null>;
  findAllFeeStructures(): Promise<FeeStructure[]>;

  // Invoice
  saveInvoice(invoice: Invoice): Promise<Invoice>;
  findInvoiceById(id: string): Promise<Invoice | null>;
  findInvoiceByStudentAndYear(studentId: string, academicYearId: string): Promise<Invoice | null>;
  findInvoicesByStudent(studentId: string): Promise<Invoice[]>;

  // Payment
  savePayment(payment: Payment): Promise<Payment>;
  findPaymentById(id: string): Promise<Payment | null>;
  findPaymentsByInvoice(invoiceId: string): Promise<Payment[]>;
  findPaymentsByStudent(studentId: string): Promise<Payment[]>;

  // Receipt
  saveReceipt(receipt: Receipt): Promise<Receipt>;
  findReceiptByPayment(paymentId: string): Promise<Receipt | null>;
  findLastReceiptNumber(): Promise<string | null>;
}
