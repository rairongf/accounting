import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateContractDto, FindManyContractsQueryDto } from './dtos';
import { CreateContractService, FindManyContractsService } from './services';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly createContractService: CreateContractService,
    private readonly findManyContractsService: FindManyContractsService,
  ) { }

  @Post()
  create(@Body() body: CreateContractDto) {
    return this.createContractService.create(body);
  }

  @Get()
  findMany(@Query() query: FindManyContractsQueryDto) {
    return this.findManyContractsService.findMany(query);
  }
}
