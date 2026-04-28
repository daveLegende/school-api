import { Level, Series, Subject, Class } from "../entities/academic.entities";

export interface AcademicRepository {
  // Levels
  saveLevel(level: Level): Promise<Level>;
  findAllLevels(): Promise<Level[]>;
  findLevelById(id: string): Promise<Level | null>;

  // Series
  saveSeries(series: Series): Promise<Series>;
  findAllSeries(): Promise<Series[]>;
  findSeriesById(id: string): Promise<Series | null>;

  // Subjects
  saveSubject(subject: Subject): Promise<Subject>;
  findAllSubjects(): Promise<Subject[]>;
  findSubjectById(id: string): Promise<Subject | null>;

  // Classes
  saveClass(classe: Class): Promise<Class>;
  findAllClasses(): Promise<Class[]>;
  findClassById(id: string): Promise<Class | null>;
  findClassesByBranch(branchId: string): Promise<Class[]>;
}
