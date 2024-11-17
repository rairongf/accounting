import { Test, TestingModule } from '@nestjs/testing';
import { FindManyKpisService } from './services';

describe('Kpis services', () => {
  let findManyService: FindManyKpisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindManyKpisService],
    }).compile();

    findManyService = module.get<FindManyKpisService>(FindManyKpisService);
  });

  it('should be defined', () => {
    expect(findManyService).toBeDefined();
  });
});
