import { Inject, Injectable } from "@nestjs/common";
import type { UserRepository } from "../../domain/repositories/user.repository.interface";
import type { ProfileRepository } from "../../domain/repositories/profile.repository.interface";
import { User } from "../../domain/entities/user.entity";
import { UserRole } from "../../domain/enums/user-role.enum";
import { CreateUserDto } from "../../presentation/dtos/create-user.dto";
import { HashingService } from "../../../auth/application/services/hashing.service";
import { StudentProfile, ProfessorProfile, ParentProfile, StaffProfile } from "../../domain/entities/profile.entity";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepo: UserRepository,
    @Inject('ProfileRepository') private profileRepo: ProfileRepository,
    private hashingService: HashingService,
  ) {}

  async execute(dto: CreateUserDto) {
    if (dto.email) {
      const existing = await this.userRepo.findByEmail(dto.email);
      if (existing) throw new Error('Email already in use');
    }

    if (dto.phone) {
      const existing = await this.userRepo.findByPhone(dto.phone);
      if (existing) throw new Error('Phone number already in use');
    }

    const hashedPassword = await this.hashingService.hash(dto.password);

    const user = User.create(
      null,
      dto.email || null,
      dto.phone || null,
      hashedPassword,
      dto.role
    );

    const savedUser = await this.userRepo.save(user);

    // Initialise Profile based on Role
    await this.createProfile(savedUser.id!, dto);

    return savedUser;
  }

  private async createProfile(userId: string, dto: CreateUserDto) {
    switch (dto.role) {
      case UserRole.STUDENT:
        await this.profileRepo.saveStudent(new StudentProfile(
          null, userId, dto.firstName, dto.lastName, 
          new Date(dto.dateOfBirth!), dto.matricule!, dto.classId!, dto.branchId!
        ));
        break;
      case UserRole.PROFESSOR:
        await this.profileRepo.saveProfessor(new ProfessorProfile(
          null, userId, dto.firstName, dto.lastName, 
          new Date(dto.dateOfBirth!), dto.speciality!, dto.branchId!
        ));
        break;
      case UserRole.PARENT:
        await this.profileRepo.saveParent(new ParentProfile(
          null, userId, dto.firstName, dto.lastName
        ));
        break;
      case UserRole.ADMIN:
      case UserRole.CENSEUR:
      case UserRole.SECRETAIRE:
        await this.profileRepo.saveStaff(new StaffProfile(
          null, userId, dto.firstName, dto.lastName, 
          new Date(dto.dateOfBirth!), dto.position || dto.role, dto.branchId!
        ));
        break;
      case UserRole.SUPERADMIN:
        // Superadmin might not need a profile or a basic one
        break;
    }
  }
}