import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BranchOrmEntity } from '../../../../modules/branches/infrastucture/orm/branch.orm-entity';

@Entity('levels')
export class LevelOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;
}

@Entity('series')
export class SeriesOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;
}

@Entity('subjects')
export class SubjectOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('decimal')
  coefficient: number;
}

@Entity('classes')
export class ClassOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => LevelOrmEntity)
  @JoinColumn({ name: 'levelId' })
  level: LevelOrmEntity;

  @Column()
  levelId: string;

  @ManyToOne(() => SeriesOrmEntity, { nullable: true })
  @JoinColumn({ name: 'seriesId' })
  series: SeriesOrmEntity;

  @Column({ type: 'varchar', nullable: true })
  seriesId?: string;

  @ManyToOne(() => BranchOrmEntity)
  @JoinColumn({ name: 'branchId' })
  branch: BranchOrmEntity;

  @Column()
  branchId: string;
}
