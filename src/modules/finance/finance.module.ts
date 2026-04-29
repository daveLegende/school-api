import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  FeeStructureOrmEntity, 
  InvoiceOrmEntity, 
  PaymentOrmEntity, 
  ReceiptOrmEntity 
} from './infrastucture/orm/finance.orm-entities';
import { TypeOrmFinanceRepository } from './infrastucture/repositories/finance.repository';
import { CreateFeeStructureUseCase } from './application/use-cases/create-fee-structure.usecase';
import { GenerateInvoiceUseCase } from './application/use-cases/generate-invoice.usecase';
import { RecordPaymentUseCase } from './application/use-cases/record-payment.usecase';
import { GetStudentFinancialStatusUseCase } from './application/use-cases/get-student-financial-status.usecase';
import { GenerateReceiptUseCase } from './application/use-cases/generate-receipt.usecase';
import { FinanceController } from './presentation/controllers/finance.controller';
import { AcademicModule } from '../academic/academic.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeeStructureOrmEntity,
      InvoiceOrmEntity,
      PaymentOrmEntity,
      ReceiptOrmEntity,
    ]),
    AcademicModule,
    UsersModule,
  ],
  controllers: [FinanceController],
  providers: [
    {
      provide: 'FinanceRepository',
      useClass: TypeOrmFinanceRepository,
    },
    CreateFeeStructureUseCase,
    GenerateInvoiceUseCase,
    RecordPaymentUseCase,
    GetStudentFinancialStatusUseCase,
    GenerateReceiptUseCase,
  ],
  exports: [
    'FinanceRepository',
    GenerateInvoiceUseCase,
  ],
})
export class FinanceModule {}
