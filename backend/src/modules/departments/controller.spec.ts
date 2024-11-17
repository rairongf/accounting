import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './controller';
import { FindManyDepartmentsService } from './services';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [FindManyDepartmentsService]
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
