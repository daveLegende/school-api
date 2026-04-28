export class Settings {
  constructor(
    public readonly id: string | null,
    public schoolName: string,
    public address: string | null,
    public phone: string | null,
    public email: string | null,
    public website: string | null,
    public logoUrl: string | null,
    public currency: string, // e.g., FCFA, EUR, USD
    public timezone: string,
    public primaryLanguage: string,
    public defaultGradingSystem: number, // 20 or 100
  ) {}

  static createDefault(): Settings {
    return new Settings(
      null,
      'My New School',
      null,
      null,
      null,
      null,
      null,
      'FCFA',
      'UTC',
      'French',
      20,
    );
  }
}
