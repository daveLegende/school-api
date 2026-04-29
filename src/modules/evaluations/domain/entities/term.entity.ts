export class Term {
  constructor(
    public readonly id: string | null,
    public name: string,
    public order: number,
    public academicYearId: string,
  ) {}

  static create(name: string, order: number, academicYearId: string): Term {
    return new Term(null, name, order, academicYearId);
  }
}
