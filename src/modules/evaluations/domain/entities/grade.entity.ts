import { GradeStatus } from '../enums/grade-status.enum';

export class Grade {
  constructor(
    public readonly id: string | null,
    public readonly evaluationId: string,
    public readonly studentId: string,
    public status: GradeStatus,
    public score: number | null,
    public comments: string | null,
  ) {}

  static create(
    evaluationId: string,
    studentId: string,
    status: GradeStatus,
    score: number | null,
    comments: string | null = null,
  ): Grade {
    if (status !== GradeStatus.PRESENT && score !== null) {
      throw new Error('Score must be null if student is absent or excused');
    }
    return new Grade(null, evaluationId, studentId, status, score, comments);
  }

  update(status: GradeStatus, score: number | null, comments: string | null = null): void {
    if (status !== GradeStatus.PRESENT && score !== null) {
      throw new Error('Score must be null if student is absent or excused');
    }
    this.status = status;
    this.score = score;
    this.comments = comments;
  }
}
