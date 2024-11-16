import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards';
import { AuthModule } from './modules/auth/module';
import { ConfigModule } from './modules/config/module';
import { DataModule } from './modules/data/module';
import { UploadModule } from './modules/upload/module';

@Module({
  imports: [
    ConfigModule,
    DataModule,
    AuthModule,
    UploadModule,
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
