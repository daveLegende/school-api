import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRepository } from '../../../users/domain/repositories/user.repository.interface';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private userRepo: UserRepository,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.userRepo.findByEmailOrPhone(identifier);
    
    if (user && await this.hashingService.compare(pass, user.password)) {
      if (!user.isActive) {
        throw new UnauthorizedException('Account is inactive');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      phone: user.phone, 
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    };
  }
}
