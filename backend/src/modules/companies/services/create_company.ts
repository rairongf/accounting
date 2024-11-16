import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create_company';

@Injectable()
export class CreateCompanyService {
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }
}