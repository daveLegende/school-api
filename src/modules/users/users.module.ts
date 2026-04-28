import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { TypeOrmUserRepository } from './infrastucture/repositories/user.repository';
import { TypeOrmProfileRepository } from './infrastucture/repositories/profile.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserOrmEntity } from './infrastucture/orm/user.orm-entity';
import { 
  StudentProfileOrmEntity, 
  ProfessorProfileOrmEntity, 
  ParentProfileOrmEntity, 
  StaffProfileOrmEntity 
} from './infrastucture/orm/profile.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOrmEntity,
      StudentProfileOrmEntity,
      ProfessorProfileOrmEntity,
      ParentProfileOrmEntity,
      StaffProfileOrmEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'ProfileRepository',
      useClass: TypeOrmProfileRepository,
    },
    CreateUserUseCase,
  ],
  exports: ['UserRepository', 'ProfileRepository'],
})
export class UsersModule { }
