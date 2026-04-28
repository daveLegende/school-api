export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  PROMOTED = 'PROMOTED',
  REPEATING = 'REPEATING',
  DROPPED_OUT = 'DROPPED_OUT',
  TRANSFERRED = 'TRANSFERRED',
}

export class Enrollment {
  constructor(
    public readonly id: string | null,
    public readonly studentId: string,
    public readonly classId: string,
    public readonly schoolYearId: string,
    public status: EnrollmentStatus,
    public readonly enrolledAt: Date,
  ) {}

  static create(studentId: string, classId: string, schoolYearId: string): Enrollment {
    return new Enrollment(
      null,
      studentId,
      classId,
      schoolYearId,
      EnrollmentStatus.ENROLLED,
      new Date(),
    );
  }
}
