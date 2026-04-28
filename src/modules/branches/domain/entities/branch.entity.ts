export class Branch {
  constructor(
    public readonly id: string | null,
    public name: string,
    public city: string,
    public readonly createdAt: Date,
  ) {}

  static create(name: string, city: string): Branch {
    return new Branch(null, name, city, new Date());
  }
}
