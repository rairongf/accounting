import { Module } from '@nestjs/common';
import { ContractsController } from './controller';
import { CreateContractService, FindManyContractsService } from './services';

@Module({
  controllers: [ContractsController],
  providers: [CreateContractService, FindManyContractsService],
})
export class ContractsModule { }
