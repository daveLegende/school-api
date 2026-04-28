import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchOrmEntity } from './infrastucture/orm/branch.orm-entity';
import { TypeOrmBranchRepository } from './infrastucture/repositories/branch.repository';
import { CreateBranchUseCase } from './application/use-cases/create-branch.usecase';
import { GetBranchesUseCase } from './application/use-cases/get-branches.usecase';
import { BranchController } from './presentation/controllers/branch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BranchOrmEntity])],
  controllers: [BranchController],
  providers: [
    {
      provide: 'BranchRepository',
      useClass: TypeOrmBranchRepository,
    },
    CreateBranchUseCase,
    GetBranchesUseCase,
  ],
  exports: ['BranchRepository'],
})
export class BranchesModule {}
