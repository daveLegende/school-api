import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Branch } from "../../domain/entities/branch.entity";
import { BranchRepository } from "../../domain/repositories/branch.repository.interface";
import { BranchOrmEntity } from "../orm/branch.orm-entity";

@Injectable()
export class TypeOrmBranchRepository implements BranchRepository {
  constructor(
    @InjectRepository(BranchOrmEntity)
    private repo: Repository<BranchOrmEntity>,
  ) {}

  async save(branch: Branch): Promise<Branch> {
    const entity = this.repo.create({
      id: branch.id || undefined,
      name: branch.name,
      city: branch.city,
      createdAt: branch.createdAt,
    });
    const saved = await this.repo.save(entity);
    return new Branch(saved.id, saved.name, saved.city, saved.createdAt);
  }

  async findById(id: string): Promise<Branch | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    return new Branch(entity.id, entity.name, entity.city, entity.createdAt);
  }

  async findAll(): Promise<Branch[]> {
    const entities = await this.repo.find();
    return entities.map(e => new Branch(e.id, e.name, e.city, e.createdAt));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
