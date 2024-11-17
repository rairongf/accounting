import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './controller';
import { CreateCompanyService, DeleteCompanyService, FindManyCompaniesService } from './services';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CreateCompanyService, DeleteCompanyService, FindManyCompaniesService],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
