import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileRepository } from "../../domain/repositories/profile.repository.interface";
import { StudentProfile, ProfessorProfile, ParentProfile, StaffProfile } from "../../domain/entities/profile.entity";
import { 
  StudentProfileOrmEntity, 
  ProfessorProfileOrmEntity, 
  ParentProfileOrmEntity, 
  StaffProfileOrmEntity 
} from "../orm/profile.orm-entity";

@Injectable()
export class TypeOrmProfileRepository implements ProfileRepository {
  constructor(
    @InjectRepository(StudentProfileOrmEntity)
    private studentRepo: Repository<StudentProfileOrmEntity>,
    @InjectRepository(ProfessorProfileOrmEntity)
    private professorRepo: Repository<ProfessorProfileOrmEntity>,
    @InjectRepository(ParentProfileOrmEntity)
    private parentRepo: Repository<ParentProfileOrmEntity>,
    @InjectRepository(StaffProfileOrmEntity)
    private staffRepo: Repository<StaffProfileOrmEntity>,
  ) {}

  async saveStudent(profile: StudentProfile): Promise<StudentProfile> {
    const entity = this.studentRepo.create({
      id: profile.id || undefined,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      matricule: profile.matricule,
      classId: profile.classId,
      branchId: profile.branchId,
    });
    const saved = await this.studentRepo.save(entity);
    return new StudentProfile(
      saved.id, saved.userId, saved.firstName, saved.lastName, 
      saved.dateOfBirth, saved.matricule, saved.classId, saved.branchId
    );
  }

  async saveProfessor(profile: ProfessorProfile): Promise<ProfessorProfile> {
    const entity = this.professorRepo.create({
      id: profile.id || undefined,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      speciality: profile.speciality,
      branchId: profile.branchId,
    });
    const saved = await this.professorRepo.save(entity);
    return new ProfessorProfile(
      saved.id, saved.userId, saved.firstName, saved.lastName, 
      saved.dateOfBirth, saved.speciality, saved.branchId
    );
  }

  async saveParent(profile: ParentProfile): Promise<ParentProfile> {
    const entity = this.parentRepo.create({
      id: profile.id || undefined,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
    const saved = await this.parentRepo.save(entity);
    return new ParentProfile(saved.id, saved.userId, saved.firstName, saved.lastName);
  }

  async saveStaff(profile: StaffProfile): Promise<StaffProfile> {
    const entity = this.staffRepo.create({
      id: profile.id || undefined,
      userId: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      position: profile.position,
      branchId: profile.branchId,
    });
    const saved = await this.staffRepo.save(entity);
    return new StaffProfile(
      saved.id, saved.userId, saved.firstName, saved.lastName, 
      saved.dateOfBirth, saved.position, saved.branchId
    );
  }
}
