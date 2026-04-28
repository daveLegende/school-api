import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './modules/security/security.module';
import { BranchesModule } from './modules/branches/branches.module';
import { AcademicModule } from './modules/academic/academic.module';
import { AcademicYearsModule } from './modules/academic-years/academic-years.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SecurityModule,
    UsersModule,
    AuthModule,
    BranchesModule,
    AcademicModule,
    AcademicYearsModule,
    EnrollmentsModule,
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'school_db',
      autoLoadEntities: true,
      synchronize: true, // DEV only
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
