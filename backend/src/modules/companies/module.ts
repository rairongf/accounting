import { Module } from '@nestjs/common';
import { CompaniesController } from './controller';
import { CreateCompanyService, DeleteCompanyService, FindManyCompaniesService } from './services';

@Module({
  controllers: [CompaniesController],
  providers: [DeleteCompanyService, FindManyCompaniesService, CreateCompanyService],
})
export class CompaniesModule { }
