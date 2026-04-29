import { EvaluationType } from '../enums/evaluation-type.enum';

export class Evaluation {
  constructor(
    public readonly id: string | null,
    public name: string,
    public type: EvaluationType,
    public subjectId: string,
    public classId: string,
    public termId: string,
    public academicYearId: string,
    public date: Date,
    public maxScore: number,
    public coefficient: number,
    public isPublished: boolean,
  ) {}

  static create(
    name: string,
    type: EvaluationType,
    subjectId: string,
    classId: string,
    termId: string,
    academicYearId: string,
    date: Date,
    maxScore: number = 20,
    coefficient: number = 1,
  ): Evaluation {
    return new Evaluation(
      null,
      name,
      type,
      subjectId,
      classId,
      termId,
      academicYearId,
      date,
      maxScore,
      coefficient,
      false, // Defaults to false
    );
  }

  publish(): void {
    this.isPublished = true;
  }
}
