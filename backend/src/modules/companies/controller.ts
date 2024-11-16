import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create_company';
import { CreateCompanyService, DeleteCompanyService, FindAllCompaniesService } from './services';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly deleteCompanyService: DeleteCompanyService,
    private readonly findAllCompaniesService: FindAllCompaniesService,
  ) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.findAllCompaniesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCompanyService.delete(+id);
  }
}
