import { Inject, Injectable } from "@nestjs/common";
import { Receipt } from "../../domain/entities/receipt.entity";
import type { FinanceRepository } from "../../domain/repositories/finance.repository.interface";

@Injectable()
export class GenerateReceiptUseCase {
  constructor(
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
  ) {}

  async execute(paymentId: string, generatedBy: string): Promise<Receipt> {
    const lastNumber = await this.financeRepo.findLastReceiptNumber();
    const nextNumber = this.calculateNextReceiptNumber(lastNumber);

    const receipt = Receipt.create(paymentId, nextNumber, generatedBy);
    return this.financeRepo.saveReceipt(receipt);
  }

  private calculateNextReceiptNumber(lastNumber: string | null): string {
    const year = new Date().getFullYear();
    const prefix = `REC-${year}-`;
    
    if (!lastNumber || !lastNumber.startsWith(prefix)) {
      return `${prefix}0001`;
    }

    const lastSeq = parseInt(lastNumber.split('-')[2]);
    const nextSeq = (lastSeq + 1).toString().padStart(4, '0');
    return `${prefix}${nextSeq}`;
  }
}
