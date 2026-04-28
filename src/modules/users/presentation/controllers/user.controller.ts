import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { CreateUserDto } from "../dtos/create-user.dto";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../../domain/enums/user-role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.SECRETAIRE)
export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }
}