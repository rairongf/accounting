import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards';
import { AuthModule } from './modules/auth/module';
import { CompaniesModule } from './modules/companies/module';
import { ConfigModule } from './modules/config/module';
import { ContractsModule } from './modules/contracts/module';
import { DataModule } from './modules/data/module';
import { DepartmentsModule } from './modules/departments/module';
import { KpisModule } from './modules/kpis/module';
import { UploadModule } from './modules/upload/module';

@Module({
  imports: [
    ConfigModule,
    DataModule,
    AuthModule,
    UploadModule,
    CompaniesModule,
    ContractsModule,
    KpisModule,
    DepartmentsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
