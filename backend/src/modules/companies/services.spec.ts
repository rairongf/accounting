import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyService, DeleteCompanyService, FindAllCompaniesService } from './services';

describe('Companies services', () => {
  let createService: CreateCompanyService;
  let deleteService: DeleteCompanyService;
  let findAllService: FindAllCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCompanyService, DeleteCompanyService, FindAllCompaniesService],
    }).compile();

    createService = module.get<CreateCompanyService>(CreateCompanyService);
    deleteService = module.get<DeleteCompanyService>(DeleteCompanyService);
    findAllService = module.get<FindAllCompaniesService>(FindAllCompaniesService);
  });

  it('should be defined', () => {
    expect(createService).toBeDefined();
    expect(deleteService).toBeDefined();
    expect(findAllService).toBeDefined();
  });
});
