import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCompanyDto, FindManyCompaniesQueryDto } from './dtos';
import { CreateCompanyService, DeleteCompanyService, FindManyCompaniesService } from './services';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly deleteCompanyService: DeleteCompanyService,
    private readonly findManyCompaniesService: FindManyCompaniesService,
  ) { }

  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.createCompanyService.create(body);
  }

  @Get()
  findAll(@Query() query: FindManyCompaniesQueryDto) {
    return this.findManyCompaniesService.findMany(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCompanyService.delete(+id);
  }
}
