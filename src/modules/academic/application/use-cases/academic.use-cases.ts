import { Inject, Injectable } from "@nestjs/common";
import { Level, Series, Subject, Class } from "../../domain/entities/academic.entities";
import type { AcademicRepository } from "../../domain/repositories/academic.repository.interfaces";
import { 
  CreateLevelDto, 
  CreateSeriesDto, 
  CreateSubjectDto, 
  CreateClassDto 
} from "../../presentation/dtos/academic.dtos";

@Injectable()
export class AcademicUseCases {
  constructor(
    @Inject('AcademicRepository') private academicRepo: AcademicRepository,
  ) {}

  async createLevel(dto: CreateLevelDto): Promise<Level> {
    const level = Level.create(dto.name, dto.description || null);
    return this.academicRepo.saveLevel(level);
  }

  async getAllLevels(): Promise<Level[]> {
    return this.academicRepo.findAllLevels();
  }

  async createSeries(dto: CreateSeriesDto): Promise<Series> {
    const series = Series.create(dto.name, dto.code);
    return this.academicRepo.saveSeries(series);
  }

  async getAllSeries(): Promise<Series[]> {
    return this.academicRepo.findAllSeries();
  }

  async createSubject(dto: CreateSubjectDto): Promise<Subject> {
    const subject = Subject.create(dto.name, dto.code, dto.coefficient);
    return this.academicRepo.saveSubject(subject);
  }

  async getAllSubjects(): Promise<Subject[]> {
    return this.academicRepo.findAllSubjects();
  }

  async createClass(dto: CreateClassDto): Promise<Class> {
    const classe = Class.create(dto.name, dto.levelId, dto.seriesId || null, dto.branchId);
    return this.academicRepo.saveClass(classe);
  }

  async getAllClasses(): Promise<Class[]> {
    return this.academicRepo.findAllClasses();
  }

  async getClassesByBranch(branchId: string): Promise<Class[]> {
    return this.academicRepo.findClassesByBranch(branchId);
  }
}
