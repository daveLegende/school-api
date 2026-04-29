import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentOrmEntity } from './infrastucture/orm/enrollment.orm-entity';
import { TypeOrmEnrollmentRepository } from './infrastucture/repositories/enrollment.repository';
import { EnrollStudentUseCase } from './application/use-cases/enroll-student.usecase';
import { EnrollmentController } from './presentation/controllers/enrollment.controller';
import { UsersModule } from '../users/users.module';
import { AcademicModule } from '../academic/academic.module';
import { FinanceModule } from '../finance/finance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentOrmEntity]),
    UsersModule,
    AcademicModule,
    FinanceModule,
  ],
  controllers: [EnrollmentController],
  providers: [
    {
      provide: 'EnrollmentRepository',
      useClass: TypeOrmEnrollmentRepository,
    },
    EnrollStudentUseCase,
  ],
})
export class EnrollmentsModule {}
