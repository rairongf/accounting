import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCompanyService {
  delete(id: number) {
    return `This action removes a #${id} company`;
  }
}