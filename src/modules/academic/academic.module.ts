import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  LevelOrmEntity, 
  SeriesOrmEntity, 
  SubjectOrmEntity, 
  ClassOrmEntity 
} from './infrastucture/orm/academic.orm-entities';
import { TypeOrmAcademicRepository } from './infrastucture/repositories/academic.repository';
import { AcademicUseCases } from './application/use-cases/academic.use-cases';
import { AcademicController } from './presentation/controllers/academic.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LevelOrmEntity,
      SeriesOrmEntity,
      SubjectOrmEntity,
      ClassOrmEntity,
    ]),
  ],
  controllers: [AcademicController],
  providers: [
    {
      provide: 'AcademicRepository',
      useClass: TypeOrmAcademicRepository,
    },
    AcademicUseCases,
  ],
  exports: ['AcademicRepository'],
})
export class AcademicModule {}
