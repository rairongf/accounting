import { Module } from '@nestjs/common';
import { KpisController } from './controller';
import { FindManyKpisService } from './services';

@Module({
  controllers: [KpisController],
  providers: [FindManyKpisService],
})
export class KpisModule { }
