import { Controller, Post, Get, Patch, Body, Param, UseGuards } from "@nestjs/common";
import { CreateTermUseCase } from "../../application/use-cases/create-term.usecase";
import { CreateEvaluationUseCase } from "../../application/use-cases/create-evaluation.usecase";
import { PublishEvaluationUseCase } from "../../application/use-cases/publish-evaluation.usecase";
import { RecordGradesUseCase } from "../../application/use-cases/record-grades.usecase";
import { GenerateBulletinUseCase } from "../../application/use-cases/generate-bulletin.usecase";
import { ListEvaluationsByClassUseCase } from "../../application/use-cases/list-evaluations-by-class.usecase";
import { CreateTermDto } from "../dtos/term.dtos";
import { CreateEvaluationDto } from "../dtos/evaluation.dtos";
import { RecordGradesDto } from "../dtos/grade.dtos";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../../../users/domain/enums/user-role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('evaluations')
@ApiBearerAuth()
@Controller('evaluations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvaluationsController {
  constructor(
    private createTermUseCase: CreateTermUseCase,
    private createEvaluationUseCase: CreateEvaluationUseCase,
    private publishEvaluationUseCase: PublishEvaluationUseCase,
    private recordGradesUseCase: RecordGradesUseCase,
    private generateBulletinUseCase: GenerateBulletinUseCase,
    private listEvaluationsUseCase: ListEvaluationsByClassUseCase,
  ) {}

  @Post('terms')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.CENSEUR)
  createTerm(@Body() dto: CreateTermDto) {
    return this.createTermUseCase.execute(dto);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.PROFESSOR, UserRole.CENSEUR)
  createEvaluation(@Body() dto: CreateEvaluationDto) {
    return this.createEvaluationUseCase.execute(dto);
  }

  @Patch(':id/publish')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.PROFESSOR, UserRole.CENSEUR)
  publishEvaluation(@Param('id') id: string) {
    return this.publishEvaluationUseCase.execute(id);
  }

  @Post(':id/grades')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.PROFESSOR, UserRole.CENSEUR)
  recordGrades(@Param('id') id: string, @Body() dto: RecordGradesDto) {
    return this.recordGradesUseCase.execute(id, dto);
  }

  @Get('class/:classId/term/:termId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.PROFESSOR, UserRole.CENSEUR, UserRole.PARENT, UserRole.STUDENT)
  listEvaluations(@Param('classId') classId: string, @Param('termId') termId: string) {
    return this.listEvaluationsUseCase.execute(classId, termId);
  }

  @Get('bulletins/student/:studentId/term/:termId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.PROFESSOR, UserRole.CENSEUR, UserRole.PARENT, UserRole.STUDENT)
  generateBulletin(
    @Param('studentId') studentId: string,
    @Param('termId') termId: string,
  ) {
    return this.generateBulletinUseCase.execute(studentId, termId);
  }
}
