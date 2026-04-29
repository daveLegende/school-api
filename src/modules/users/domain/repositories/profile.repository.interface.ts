import { StudentProfile, ProfessorProfile, ParentProfile, StaffProfile } from "../entities/profile.entity";

export interface ProfileRepository {
  saveStudent(profile: StudentProfile): Promise<StudentProfile>;
  saveProfessor(profile: ProfessorProfile): Promise<ProfessorProfile>;
  saveParent(profile: ParentProfile): Promise<ParentProfile>;
  saveStaff(profile: StaffProfile): Promise<StaffProfile>;
  findStudentByUserId(userId: string): Promise<StudentProfile | null>;
}
