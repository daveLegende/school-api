import { Branch } from "../entities/branch.entity";

export interface BranchRepository {
  save(branch: Branch): Promise<Branch>;
  findById(id: string): Promise<Branch | null>;
  findAll(): Promise<Branch[]>;
  delete(id: string): Promise<void>;
}
