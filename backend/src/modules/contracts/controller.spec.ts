import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from './controller';
import { CreateContractService, FindManyContractsService } from './services';

describe('ContractsController', () => {
  let controller: ContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [CreateContractService, FindManyContractsService],
    }).compile();

    controller = module.get<ContractsController>(ContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
