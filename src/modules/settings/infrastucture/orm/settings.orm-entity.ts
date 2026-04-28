import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class SettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'My New School' })
  schoolName: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  logoUrl: string;

  @Column({ default: 'FCFA' })
  currency: string;

  @Column({ default: 'UTC' })
  timezone: string;

  @Column({ default: 'French' })
  primaryLanguage: string;

  @Column({ default: 20 })
  defaultGradingSystem: number;
}
