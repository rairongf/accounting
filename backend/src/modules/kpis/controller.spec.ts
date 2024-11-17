import { Test, TestingModule } from '@nestjs/testing';
import { KpisController } from './controller';
import { FindManyKpisService } from './services';

describe('KpisController', () => {
  let controller: KpisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KpisController],
      providers: [FindManyKpisService]
    }).compile();

    controller = module.get<KpisController>(KpisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
