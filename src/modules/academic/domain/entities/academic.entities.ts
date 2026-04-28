export class Level {
  constructor(
    public readonly id: string | null,
    public name: string,
    public description: string | null,
  ) {}

  static create(name: string, description: string | null): Level {
    return new Level(null, name, description);
  }
}

export class Series {
  constructor(
    public readonly id: string | null,
    public name: string,
    public code: string,
  ) {}

  static create(name: string, code: string): Series {
    return new Series(null, name, code);
  }
}

export class Subject {
  constructor(
    public readonly id: string | null,
    public name: string,
    public code: string,
    public coefficient: number,
  ) {}

  static create(name: string, code: string, coefficient: number): Subject {
    return new Subject(null, name, code, coefficient);
  }
}

export class Class {
  constructor(
    public readonly id: string | null,
    public name: string,
    public levelId: string,
    public seriesId: string | null,
    public branchId: string,
  ) {}

  static create(name: string, levelId: string, seriesId: string | null, branchId: string): Class {
    return new Class(null, name, levelId, seriesId, branchId);
  }
}
