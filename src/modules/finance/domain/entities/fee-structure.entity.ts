export class FeeStructure {
  constructor(
    public readonly id: string | null,
    public name: string,
    public totalAmount: number,
    public numberOfInstallments: number,
    public academicYearId: string,
    public levelId: string | null = null,
    public classId: string | null = null,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static create(
    name: string,
    totalAmount: number,
    numberOfInstallments: number,
    academicYearId: string,
    levelId: string | null = null,
    classId: string | null = null,
  ): FeeStructure {
    if (!levelId && !classId) {
      throw new Error('Fee structure must be linked to a Level or a Class');
    }
    return new FeeStructure(
      null,
      name,
      totalAmount,
      numberOfInstallments,
      academicYearId,
      levelId,
      classId,
    );
  }
}
