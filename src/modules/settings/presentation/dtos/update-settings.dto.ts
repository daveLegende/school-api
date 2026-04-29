import { IsOptional, IsString, IsNumber, IsEmail, IsUrl, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AbsencePolicy } from "../../domain/enums/absence-policy.enum";

export class UpdateSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  schoolName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primaryLanguage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  defaultGradingSystem?: number;

  @ApiProperty({ required: false, enum: AbsencePolicy })
  @IsOptional()
  @IsEnum(AbsencePolicy)
  absencePolicy?: AbsencePolicy;
}
