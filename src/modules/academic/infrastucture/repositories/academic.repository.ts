import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { AcademicRepository } from "../../domain/repositories/academic.repository.interfaces";
import { Level, Series, Subject, Class } from "../../domain/entities/academic.entities";
import { 
  LevelOrmEntity, 
  SeriesOrmEntity, 
  SubjectOrmEntity, 
  ClassOrmEntity 
} from "../orm/academic.orm-entities";

@Injectable()
export class TypeOrmAcademicRepository implements AcademicRepository {
  constructor(
    @InjectRepository(LevelOrmEntity)
    private levelRepo: Repository<LevelOrmEntity>,
    @InjectRepository(SeriesOrmEntity)
    private seriesRepo: Repository<SeriesOrmEntity>,
    @InjectRepository(SubjectOrmEntity)
    private subjectRepo: Repository<SubjectOrmEntity>,
    @InjectRepository(ClassOrmEntity)
    private classRepo: Repository<ClassOrmEntity>,
  ) {}

  // Levels
  async saveLevel(level: Level): Promise<Level> {
    const entity = this.levelRepo.create({
      id: level.id ?? undefined,
      name: level.name,
      description: level.description ?? undefined,
    });
    const saved = await this.levelRepo.save(entity);
    return new Level(saved.id, saved.name, saved.description ?? null);
  }

  async findAllLevels(): Promise<Level[]> {
    const entities = await this.levelRepo.find();
    return entities.map(e => new Level(e.id, e.name, e.description ?? null));
  }

  async findLevelById(id: string): Promise<Level | null> {
    const entity = await this.levelRepo.findOne({ where: { id } });
    return entity ? new Level(entity.id, entity.name, entity.description ?? null) : null;
  }

  // Series
  async saveSeries(series: Series): Promise<Series> {
    const entity = this.seriesRepo.create({
      id: series.id ?? undefined,
      name: series.name,
      code: series.code,
    });
    const saved = await this.seriesRepo.save(entity);
    return new Series(saved.id, saved.name, saved.code);
  }

  async findAllSeries(): Promise<Series[]> {
    const entities = await this.seriesRepo.find();
    return entities.map(e => new Series(e.id, e.name, e.code));
  }

  async findSeriesById(id: string): Promise<Series | null> {
    const entity = await this.seriesRepo.findOne({ where: { id } });
    return entity ? new Series(entity.id, entity.name, entity.code) : null;
  }

  // Subjects
  async saveSubject(subject: Subject): Promise<Subject> {
    const entity = this.subjectRepo.create({
      id: subject.id ?? undefined,
      name: subject.name,
      code: subject.code,
      coefficient: subject.coefficient,
    });
    const saved = await this.subjectRepo.save(entity);
    return new Subject(saved.id, saved.name, saved.code, saved.coefficient);
  }

  async findAllSubjects(): Promise<Subject[]> {
    const entities = await this.subjectRepo.find();
    return entities.map(e => new Subject(e.id, e.name, e.code, e.coefficient));
  }

  async findSubjectById(id: string): Promise<Subject | null> {
    const entity = await this.subjectRepo.findOne({ where: { id } });
    return entity ? new Subject(entity.id, entity.name, entity.code, entity.coefficient) : null;
  }

  async findSubjectsByIds(ids: string[]): Promise<Subject[]> {
    if (ids.length === 0) return [];
    const entities = await this.subjectRepo.find({
      where: { id: In(ids) }
    });
    return entities.map(e => new Subject(e.id, e.name, e.code, e.coefficient));
  }

  // Classes
  async saveClass(classe: Class): Promise<Class> {
    const entity = this.classRepo.create({
      id: classe.id ?? undefined,
      name: classe.name,
      levelId: classe.levelId,
      seriesId: classe.seriesId ?? undefined,
      branchId: classe.branchId,
    });
    const saved = await this.classRepo.save(entity);
    return new Class(saved.id, saved.name, saved.levelId, saved.seriesId ?? null, saved.branchId);
  }

  async findAllClasses(): Promise<Class[]> {
    const entities = await this.classRepo.find();
    return entities.map(e => new Class(e.id, e.name, e.levelId, e.seriesId ?? null, e.branchId));
  }

  async findClassById(id: string): Promise<Class | null> {
    const entity = await this.classRepo.findOne({ where: { id } });
    return entity ? new Class(entity.id, entity.name, entity.levelId, entity.seriesId ?? null, entity.branchId) : null;
  }

  async findClassesByBranch(branchId: string): Promise<Class[]> {
    const entities = await this.classRepo.find({ where: { branchId } });
    return entities.map(e => new Class(e.id, e.name, e.levelId, e.seriesId ?? null, e.branchId));
  }
}
