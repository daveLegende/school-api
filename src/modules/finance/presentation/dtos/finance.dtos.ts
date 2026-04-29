import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsUUID, IsOptional, Min } from 'class-validator';
import { PaymentMethod } from '../../domain/enums/finance.enums';

export class CreateFeeStructureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  numberOfInstallments: number;

  @ApiProperty()
  @IsUUID()
  academicYearId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  levelId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  classId?: string;
}

export class RecordPaymentDto {
  @ApiProperty()
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsUUID()
  enrollmentId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reference?: string;
}
