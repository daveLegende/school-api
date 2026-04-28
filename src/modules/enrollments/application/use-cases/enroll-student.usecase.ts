import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import type { EnrollmentRepository } from "../../domain/repositories/enrollment.repository.interface";
import { Enrollment } from "../../domain/entities/enrollment.entity";
import { EnrollStudentDto } from "../../presentation/dtos/enroll-student.dto";
import type { UserRepository } from "../../../users/domain/repositories/user.repository.interface";
import type { AcademicRepository } from "../../../academic/domain/repositories/academic.repository.interfaces";

@Injectable()
export class EnrollStudentUseCase {
  constructor(
    @Inject('EnrollmentRepository') private enrollmentRepo: EnrollmentRepository,
    @Inject('UserRepository') private userRepo: UserRepository,
    @Inject('AcademicRepository') private academicRepo: AcademicRepository,
  ) {}

  async execute(dto: EnrollStudentDto): Promise<Enrollment> {
    // 1. Verify Student
    const student = await this.userRepo.findById(dto.studentId);
    if (!student) throw new BadRequestException('Student not found');
    if (student.role !== 'STUDENT') throw new BadRequestException('User is not a student');

    // 2. Verify Class
    const classe = await this.academicRepo.findClassById(dto.classId);
    if (!classe) throw new BadRequestException('Class not found');

    // 3. Check existing enrollment for this year
    const existing = await this.enrollmentRepo.findByStudentAndYear(dto.studentId, dto.schoolYearId);
    if (existing) throw new BadRequestException('Student is already enrolled for this school year');

    // 4. Create enrollment
    const enrollment = Enrollment.create(dto.studentId, dto.classId, dto.schoolYearId);
    return this.enrollmentRepo.save(enrollment);
  }
}
