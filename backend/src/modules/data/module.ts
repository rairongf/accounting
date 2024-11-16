import { Global, Module } from '@nestjs/common';
import { PrismaService, PrismaTransactionService } from './services';

@Global()
@Module({
  providers: [PrismaService, PrismaTransactionService],
  exports: [PrismaService, PrismaTransactionService],
})
export class DataModule {
}
