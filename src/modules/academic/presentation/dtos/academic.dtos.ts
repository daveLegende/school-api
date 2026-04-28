import { IsNotEmpty, IsString, IsOptional, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLevelDto {
  @ApiProperty({ example: 'Secondary' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'High school level', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateSeriesDto {
  @ApiProperty({ example: 'Science' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'S' })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class CreateSubjectDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MATH' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  @IsNumber()
  coefficient: number;
}

export class CreateClassDto {
  @ApiProperty({ example: 'Class 6A' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  levelId: string;

  @ApiProperty({ example: 'UUID', required: false })
  @IsOptional()
  @IsUUID()
  seriesId?: string;

  @ApiProperty({ example: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  branchId: string;
}
