import { Test, TestingModule } from '@nestjs/testing';
import { CreateContractService, FindManyContractsService } from './services';

describe('Contracts services', () => {
  let createService: CreateContractService;
  let findManyService: FindManyContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateContractService, FindManyContractsService],
    }).compile();

    createService = module.get<CreateContractService>(CreateContractService);
    findManyService = module.get<FindManyContractsService>(FindManyContractsService);
  });

  it('should be defined', () => {
    expect(createService).toBeDefined();
    expect(findManyService).toBeDefined();
  });
});
