import { Controller, Get, Query } from '@nestjs/common';
import { FindManyKpisQueryDto } from './dtos';
import { FindManyKpisService } from './services';

@Controller('kpis')
export class KpisController {
  constructor(
    private readonly findManyKpisService: FindManyKpisService,
  ) { }

  @Get()
  findMany(@Query() query: FindManyKpisQueryDto) {
    return this.findManyKpisService.findMany(query);
  }
}
