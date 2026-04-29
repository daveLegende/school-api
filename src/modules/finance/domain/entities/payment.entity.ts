import { PaymentMethod, PaymentStatus } from '../enums/finance.enums';

export class Payment {
  constructor(
    public readonly id: string | null,
    public invoiceId: string,
    public studentId: string,
    public enrollmentId: string,
    public amount: number,
    public method: PaymentMethod,
    public status: PaymentStatus,
    public recordedBy: string,
    public reference: string | null = null,
    public paidAt: Date = new Date(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static create(
    invoiceId: string,
    studentId: string,
    enrollmentId: string,
    amount: number,
    method: PaymentMethod,
    recordedBy: string,
    reference: string | null = null,
  ): Payment {
    return new Payment(
      null,
      invoiceId,
      studentId,
      enrollmentId,
      amount,
      method,
      PaymentStatus.SUCCESS, // Enforced for manual payments
      recordedBy,
      reference,
    );
  }
}
