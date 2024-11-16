import { Module } from '@nestjs/common';
import { CompaniesController } from './controller';
import { CreateCompanyService, DeleteCompanyService, FindAllCompaniesService } from './services';

@Module({
  controllers: [CompaniesController],
  providers: [CreateCompanyService, DeleteCompanyService, FindAllCompaniesService],
})
export class CompaniesModule { }
