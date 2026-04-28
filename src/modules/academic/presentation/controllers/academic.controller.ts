import { Controller, Post, Get, Body, Param, UseGuards } from "@nestjs/common";
import { AcademicUseCases } from "../../application/use-cases/academic.use-cases";
import { 
  CreateLevelDto, 
  CreateSeriesDto, 
  CreateSubjectDto, 
  CreateClassDto 
} from "../dtos/academic.dtos";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../../../users/domain/enums/user-role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('academic')
@ApiBearerAuth()
@Controller('academic')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.CENSEUR)
export class AcademicController {
  constructor(private academicUseCases: AcademicUseCases) {}

  @Post('levels')
  createLevel(@Body() dto: CreateLevelDto) {
    return this.academicUseCases.createLevel(dto);
  }

  @Get('levels')
  getAllLevels() {
    return this.academicUseCases.getAllLevels();
  }

  @Post('series')
  createSeries(@Body() dto: CreateSeriesDto) {
    return this.academicUseCases.createSeries(dto);
  }

  @Get('series')
  getAllSeries() {
    return this.academicUseCases.getAllSeries();
  }

  @Post('subjects')
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.academicUseCases.createSubject(dto);
  }

  @Get('subjects')
  getAllSubjects() {
    return this.academicUseCases.getAllSubjects();
  }

  @Post('classes')
  createClass(@Body() dto: CreateClassDto) {
    return this.academicUseCases.createClass(dto);
  }

  @Get('classes')
  getAllClasses() {
    return this.academicUseCases.getAllClasses();
  }

  @Get('classes/branch/:branchId')
  getClassesByBranch(@Param('branchId') branchId: string) {
    return this.academicUseCases.getClassesByBranch(branchId);
  }
}
