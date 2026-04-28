import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsOrmEntity } from './infrastucture/orm/settings.orm-entity';
import { SettingsService } from './application/use-cases/settings.service';
import { SettingsController } from './presentation/controllers/settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsOrmEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
