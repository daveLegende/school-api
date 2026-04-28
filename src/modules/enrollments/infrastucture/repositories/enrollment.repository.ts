import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Enrollment } from "../../domain/entities/enrollment.entity";
import { EnrollmentRepository } from "../../domain/repositories/enrollment.repository.interface";
import { EnrollmentOrmEntity } from "../orm/enrollment.orm-entity";

@Injectable()
export class TypeOrmEnrollmentRepository implements EnrollmentRepository {
  constructor(
    @InjectRepository(EnrollmentOrmEntity)
    private repo: Repository<EnrollmentOrmEntity>,
  ) {}

  async save(enrollment: Enrollment): Promise<Enrollment> {
    const entity = this.repo.create({
      id: enrollment.id || undefined,
      studentId: enrollment.studentId,
      classId: enrollment.classId,
      schoolYearId: enrollment.schoolYearId,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
    });
    const saved = await this.repo.save(entity);
    return new Enrollment(
      saved.id, 
      saved.studentId, 
      saved.classId, 
      saved.schoolYearId, 
      saved.status, 
      saved.enrolledAt
    );
  }

  async findByStudentAndYear(studentId: string, schoolYearId: string): Promise<Enrollment | null> {
    const entity = await this.repo.findOne({ where: { studentId, schoolYearId } });
    if (!entity) return null;
    return new Enrollment(
      entity.id, 
      entity.studentId, 
      entity.classId, 
      entity.schoolYearId, 
      entity.status, 
      entity.enrolledAt
    );
  }

  async findByClass(classId: string, schoolYearId: string): Promise<Enrollment[]> {
    const entities = await this.repo.find({ where: { classId, schoolYearId } });
    return entities.map(entity => new Enrollment(
      entity.id, 
      entity.studentId, 
      entity.classId, 
      entity.schoolYearId, 
      entity.status, 
      entity.enrolledAt
    ));
  }
}
