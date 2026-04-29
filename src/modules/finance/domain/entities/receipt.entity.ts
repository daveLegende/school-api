export class Receipt {
  constructor(
    public readonly id: string | null,
    public paymentId: string,
    public receiptNumber: string,
    public generatedBy: string,
    public generatedAt: Date = new Date(),
  ) {}

  static create(
    paymentId: string,
    receiptNumber: string,
    generatedBy: string,
  ): Receipt {
    return new Receipt(
      null,
      paymentId,
      receiptNumber,
      generatedBy,
    );
  }
}
