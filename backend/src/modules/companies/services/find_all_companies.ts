import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCompaniesService {
  findAll() {
    return `This action returns all companies`;
  }
}