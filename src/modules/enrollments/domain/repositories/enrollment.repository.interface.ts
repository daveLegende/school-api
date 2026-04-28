import { Enrollment } from "../entities/enrollment.entity";

export interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<Enrollment>;
  findByStudentAndYear(studentId: string, schoolYearId: string): Promise<Enrollment | null>;
  findByClass(classId: string, schoolYearId: string): Promise<Enrollment[]>;
}
