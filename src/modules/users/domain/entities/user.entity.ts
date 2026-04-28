import { UserRole } from "../enums/user-role.enum";

export class User {
  constructor(
    public readonly id: string | null,
    public email: string | null,
    public phone: string | null,
    public password: string,
    public role: UserRole,
    public isActive: boolean,
    public readonly createdAt: Date,
  ) {
    if (!email && !phone) {
      throw new Error('User must have either an email or a phone number');
    }
  }

  static create(id: string | null, email: string | null, phone: string | null, password: string, role: UserRole): User {
    return new User(
      id,
      email,
      phone,
      password,
      role,
      true,
      new Date(),
    );
  }
}