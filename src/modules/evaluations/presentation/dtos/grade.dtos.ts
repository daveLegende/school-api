import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { GradeStatus } from '../../domain/enums/grade-status.enum';

export class SingleGradeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ enum: GradeStatus })
  @IsEnum(GradeStatus)
  status: GradeStatus;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  score?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comments?: string;
}

export class RecordGradesDto {
  @ApiProperty({ type: [SingleGradeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SingleGradeDto)
  grades: SingleGradeDto[];
}
