import { Global, Module } from '@nestjs/common';
import { HashingService } from '../auth/application/services/hashing.service';
import { BcryptHashingService } from '../auth/infrastucture/services/bcrypt-hashing.service';

@Global()
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashingService,
    },
  ],
  exports: [HashingService],
})
export class SecurityModule {}
