import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository.interface";
import { UserOrmEntity } from "../orm/user.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private repo: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { phone } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmailOrPhone(identifier: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: [
        { email: identifier },
        { phone: identifier }
      ]
    });
    return entity ? this.toDomain(entity) : null;
  }

  async save(user: User): Promise<User> {
    const entity = this.repo.create({
      id: user.id || undefined,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    });

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.phone,
      entity.password,
      entity.role,
      entity.isActive,
      entity.createdAt
    );
  }
}