export interface SubjectBulletinEntry {
  subjectId: string;
  subjectName: string;
  coefficient: number;
  evaluations: {
    evaluationId: string;
    evaluationName: string;
    type: string;
    score: number | null;
    maxScore: number;
    coefficient: number;
    status: string;
  }[];
  subjectAverage: number | null; // Weighted average of evaluations
  weightedAverage: number | null; // subjectAverage * coefficient
}

export interface BulletinOutput {
  studentId: string;
  studentName: string;
  termId: string;
  termName: string;
  academicYearId: string;
  subjects: SubjectBulletinEntry[];
  totalPoints: number;
  totalCoefficients: number;
  overallAverage: number | null; // Alias for average
  average: number | null;
  rank: number | null; // Placeholder for future ranking
}
