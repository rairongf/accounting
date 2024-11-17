import { Test, TestingModule } from '@nestjs/testing';
import { FindManyDepartmentsService } from './services';

describe('Kpis services', () => {
  let findManyService: FindManyDepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindManyDepartmentsService],
    }).compile();

    findManyService = module.get<FindManyDepartmentsService>(FindManyDepartmentsService);
  });

  it('should be defined', () => {
    expect(findManyService).toBeDefined();
  });
});
