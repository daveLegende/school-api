import { Module, Injectable, Post, Body, Get, Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolYearOrmEntity } from './infrastucture/orm/school-year.orm-entity';
import { SchoolYear } from './domain/entities/school-year.entity';
import { JwtAuthGuard } from "../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/presentation/guards/roles.guard";
import { Roles } from "../auth/presentation/decorators/roles.decorator";
import { UserRole } from "../users/domain/enums/user-role.enum";
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolYearDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}

@Injectable()
export class AcademicYearsRepository {
    constructor(@InjectRepository(SchoolYearOrmEntity) private repo: Repository<SchoolYearOrmEntity>) {}
    async save(year: SchoolYear) {
        const entity = this.repo.create({ id: year.id || undefined, name: year.name, isActive: year.isActive });
        const saved = await this.repo.save(entity);
        return new SchoolYear(saved.id, saved.name, saved.isActive, saved.createdAt);
    }
    async findAll() {
        const list = await this.repo.find();
        return list.map(s => new SchoolYear(s.id, s.name, s.isActive, s.createdAt));
    }
}

@ApiTags('academic-years')
@ApiBearerAuth()
@Controller('academic-years')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
export class AcademicYearsController {
    constructor(private repo: AcademicYearsRepository) {}
    @Post()
    create(@Body() dto: CreateSchoolYearDto) {
        return this.repo.save(SchoolYear.create(dto.name));
    }
    @Get()
    findAll() {
        return this.repo.findAll();
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([SchoolYearOrmEntity])],
    controllers: [AcademicYearsController],
    providers: [AcademicYearsRepository],
    exports: [AcademicYearsRepository, TypeOrmModule],
})
export class AcademicYearsModule {}
