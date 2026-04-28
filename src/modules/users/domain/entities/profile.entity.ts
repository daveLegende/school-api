export abstract class BaseProfile {
  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public firstName: string,
    public lastName: string,
  ) {}
}

export class StudentProfile extends BaseProfile {
  constructor(
    id: string | null,
    userId: string,
    firstName: string,
    lastName: string,
    public dateOfBirth: Date,
    public matricule: string,
    public classId: string,
    public branchId: string,
  ) {
    super(id, userId, firstName, lastName);
  }
}

export class ProfessorProfile extends BaseProfile {
  constructor(
    id: string | null,
    userId: string,
    firstName: string,
    lastName: string,
    public dateOfBirth: Date,
    public speciality: string,
    public branchId: string,
  ) {
    super(id, userId, firstName, lastName);
  }
}

export class ParentProfile extends BaseProfile {
  constructor(
    id: string | null,
    userId: string,
    firstName: string,
    lastName: string,
  ) {
    super(id, userId, firstName, lastName);
  }
}

export class StaffProfile extends BaseProfile {
  constructor(
    id: string | null,
    userId: string,
    firstName: string,
    lastName: string,
    public dateOfBirth: Date,
    public position: string,
    public branchId: string,
  ) {
    super(id, userId, firstName, lastName);
  }
}
