import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollStudentUseCase } from '../../application/use-cases/enroll-student.usecase';
import { EnrollStudentDto } from '../dtos/enroll-student.dto';
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../../../users/domain/enums/user-role.enum";

@ApiTags('enrollments')
@ApiBearerAuth()
@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE)
export class EnrollmentController {
  constructor(private enrollStudent: EnrollStudentUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Enroll a student into a class for a specific school year' })
  async enroll(@Body() dto: EnrollStudentDto) {
    return this.enrollStudent.execute(dto);
  }
}
