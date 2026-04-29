import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  TermOrmEntity, 
  EvaluationOrmEntity, 
  GradeOrmEntity 
} from './infrastucture/orm/evaluations.orm-entities';
import { TypeOrmEvaluationsRepository } from './infrastucture/repositories/evaluations.repository';
import { CreateTermUseCase } from './application/use-cases/create-term.usecase';
import { CreateEvaluationUseCase } from './application/use-cases/create-evaluation.usecase';
import { PublishEvaluationUseCase } from './application/use-cases/publish-evaluation.usecase';
import { RecordGradesUseCase } from './application/use-cases/record-grades.usecase';
import { GenerateBulletinUseCase } from './application/use-cases/generate-bulletin.usecase';
import { ListEvaluationsByClassUseCase } from './application/use-cases/list-evaluations-by-class.usecase';
import { EvaluationsController } from './presentation/controllers/evaluations.controller';
import { AcademicModule } from '../academic/academic.module';
import { UsersModule } from '../users/users.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TermOrmEntity,
      EvaluationOrmEntity,
      GradeOrmEntity,
    ]),
    AcademicModule,
    UsersModule,
    SettingsModule,
  ],
  controllers: [EvaluationsController],
  providers: [
    {
      provide: 'EvaluationsRepository',
      useClass: TypeOrmEvaluationsRepository,
    },
    CreateTermUseCase,
    CreateEvaluationUseCase,
    PublishEvaluationUseCase,
    RecordGradesUseCase,
    GenerateBulletinUseCase,
    ListEvaluationsByClassUseCase,
  ],
  exports: ['EvaluationsRepository'],
})
export class EvaluationsModule {}
