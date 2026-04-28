export class SchoolYear {
  constructor(
    public readonly id: string | null,
    public name: string, // e.g., 2023-2024
    public isActive: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(name: string): SchoolYear {
    return new SchoolYear(null, name, false, new Date());
  }
}
