import { Controller, Get } from '@nestjs/common';
import { FindManyDepartmentsService } from './services';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly findManyDepartmentsService: FindManyDepartmentsService,
  ) { }

  @Get()
  findMany() {
    return this.findManyDepartmentsService.findMany();
  }
}
