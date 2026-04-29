import { InvoiceStatus } from '../enums/finance.enums';

export class Invoice {
  constructor(
    public readonly id: string | null,
    public studentId: string,
    public enrollmentId: string,
    public feeStructureId: string,
    public academicYearId: string,
    public totalAmount: number,
    public amountPaid: number,
    public remainingAmount: number,
    public status: InvoiceStatus,
    public dueDate: Date | null = null,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static create(
    studentId: string,
    enrollmentId: string,
    feeStructureId: string,
    academicYearId: string,
    totalAmount: number,
  ): Invoice {
    return new Invoice(
      null,
      studentId,
      enrollmentId,
      feeStructureId,
      academicYearId,
      totalAmount,
      0,
      totalAmount,
      InvoiceStatus.UNPAID,
    );
  }

  recordPayment(amount: number): void {
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }
    if (amount > this.remainingAmount) {
      throw new Error(`Payment amount exceeds remaining amount (${this.remainingAmount})`);
    }

    this.amountPaid += amount;
    this.remainingAmount -= amount;

    if (this.remainingAmount === 0) {
      this.status = InvoiceStatus.PAID;
    } else if (this.amountPaid > 0) {
      this.status = InvoiceStatus.PARTIAL;
    }
    
    this.updatedAt = new Date();
  }
}
