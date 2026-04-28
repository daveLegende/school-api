import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsDateString, IsUUID } from 'class-validator';
import { UserRole } from '../../domain/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@school.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+237600000000', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '2010-05-15', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: 'MAT-2023-001', required: false })
  @IsOptional()
  @IsString()
  matricule?: string;

  @ApiProperty({ example: 'UUID', required: false })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiProperty({ example: 'BRANCH_UUID', required: false })
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @ApiProperty({ example: 'Sciences', required: false })
  @IsOptional()
  @IsString()
  speciality?: string;

  @ApiProperty({ example: 'Supervisor', required: false })
  @IsOptional()
  @IsString()
  position?: string;
}