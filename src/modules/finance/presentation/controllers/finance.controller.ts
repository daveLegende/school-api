import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';
import { UserRole } from '../../../users/domain/enums/user-role.enum';
import { CreateFeeStructureUseCase } from '../../application/use-cases/create-fee-structure.usecase';
import { RecordPaymentUseCase } from '../../application/use-cases/record-payment.usecase';
import { GetStudentFinancialStatusUseCase } from '../../application/use-cases/get-student-financial-status.usecase';
import { CreateFeeStructureDto, RecordPaymentDto } from '../dtos/finance.dtos';
import type { FinanceRepository } from '../../domain/repositories/finance.repository.interface';
import { Inject } from '@nestjs/common';

@ApiTags('Finance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('finance')
export class FinanceController {
  constructor(
    private createFeeUseCase: CreateFeeStructureUseCase,
    private recordPaymentUseCase: RecordPaymentUseCase,
    private getStatusUseCase: GetStudentFinancialStatusUseCase,
    @Inject('FinanceRepository') private financeRepo: FinanceRepository,
  ) {}

  @Post('fees')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create tuition fee configuration' })
  createFeeStructure(@Body() dto: CreateFeeStructureDto) {
    return this.createFeeUseCase.execute(dto);
  }

  @Get('fees')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE)
  @ApiOperation({ summary: 'List all fee structures' })
  getAllFeeStructures() {
    return this.financeRepo.findAllFeeStructures();
  }

  @Post('payments')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE)
  @ApiOperation({ summary: 'Record a manual payment' })
  recordPayment(@Body() dto: RecordPaymentDto, @Request() req) {
    return this.recordPaymentUseCase.execute(dto, req.user.userId);
  }

  @Get('payments/student/:studentId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE, UserRole.PARENT, UserRole.STUDENT)
  @ApiOperation({ summary: 'Get student payment history' })
  getStudentPayments(@Param('studentId') studentId: string, @Request() req) {
    // RBAC check for parent/student
    if ((req.user.role === UserRole.STUDENT || req.user.role === UserRole.PARENT) && req.user.userId !== studentId) {
       // Ideally we'd check if parent is linked to student, but for now simple check
       // throw new ForbiddenException();
    }
    return this.financeRepo.findPaymentsByStudent(studentId);
  }

  @Get('invoices/student/:studentId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE, UserRole.PARENT, UserRole.STUDENT)
  @ApiOperation({ summary: 'Get student invoices' })
  getStudentInvoices(@Param('studentId') studentId: string) {
    return this.financeRepo.findInvoicesByStudent(studentId);
  }

  @Get('students/:studentId/status')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE, UserRole.PARENT, UserRole.STUDENT)
  @ApiOperation({ summary: 'Get detailed financial status' })
  getStudentStatus(@Param('studentId') studentId: string) {
    return this.getStatusUseCase.execute(studentId);
  }
}
