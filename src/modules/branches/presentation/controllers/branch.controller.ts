import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { CreateBranchUseCase } from "../../application/use-cases/create-branch.usecase";
import { GetBranchesUseCase } from "../../application/use-cases/get-branches.usecase";
import { CreateBranchDto } from "../dtos/create-branch.dto";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../../../users/domain/enums/user-role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('branches')
@ApiBearerAuth()
@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
export class BranchController {
  constructor(
    private createBranch: CreateBranchUseCase,
    private getBranches: GetBranchesUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateBranchDto) {
    return this.createBranch.execute(dto);
  }

  @Get()
  async findAll() {
    return this.getBranches.execute();
  }
}
