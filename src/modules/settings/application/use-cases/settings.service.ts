import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsOrmEntity } from '../../infrastucture/orm/settings.orm-entity';
import { Settings } from '../../domain/entities/settings.entity';
import { UpdateSettingsDto } from '../../presentation/dtos/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsOrmEntity)
    private repo: Repository<SettingsOrmEntity>,
  ) {}

  async getSettings(): Promise<Settings> {
    let entity = await this.repo.findOne({ where: {} });
    if (!entity) {
      const defaultValue = Settings.createDefault();
      entity = this.repo.create({
        schoolName: defaultValue.schoolName,
        currency: defaultValue.currency,
        timezone: defaultValue.timezone,
        primaryLanguage: defaultValue.primaryLanguage,
        defaultGradingSystem: defaultValue.defaultGradingSystem,
      });
      await this.repo.save(entity);
    }
    return this.mapToDomain(entity);
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<Settings> {
    const settings = await this.getSettings();
    if (settings.id) {
        await this.repo.update(settings.id, dto);
    }
    const updated = await this.repo.findOne({ where: { id: settings.id! } });
    return this.mapToDomain(updated!);
  }

  private mapToDomain(entity: SettingsOrmEntity): Settings {
    return new Settings(
      entity.id,
      entity.schoolName,
      entity.address ?? null,
      entity.phone ?? null,
      entity.email ?? null,
      entity.website ?? null,
      entity.logoUrl ?? null,
      entity.currency,
      entity.timezone,
      entity.primaryLanguage,
      entity.defaultGradingSystem,
    );
  }
}
