import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsDateString, IsOptional, Min } from 'class-validator';
import { EvaluationType } from '../../domain/enums/evaluation-type.enum';

export class CreateEvaluationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: EvaluationType })
  @IsEnum(EvaluationType)
  type: EvaluationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  termId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ default: 20 })
  @IsNumber()
  @IsOptional()
  maxScore?: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  coefficient?: number;
}
