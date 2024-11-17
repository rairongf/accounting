import { Module } from '@nestjs/common';
import { DepartmentsController } from './controller';
import { FindManyDepartmentsService } from './services';

@Module({
  controllers: [DepartmentsController],
  providers: [FindManyDepartmentsService],
})
export class DepartmentsModule { }
