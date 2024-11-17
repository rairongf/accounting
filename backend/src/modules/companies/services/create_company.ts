import { Injectable } from '@nestjs/common';
import { PrismaTransactionService } from 'src/modules/data';
import { CreateCompanyDto } from '../dtos/create_company';
import { Company } from '../entities/company';

@Injectable()
export class CreateCompanyService {
  constructor(
    private readonly prismaTransactionService: PrismaTransactionService,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.prismaTransactionService.handle<any>(
      async (prisma) => prisma.company.create({
        data: {
          name: createCompanyDto.name,
          legal_name: createCompanyDto.legalName,
          trade_name: createCompanyDto.tradeName,
          tax_id: createCompanyDto.taxId,
          state: createCompanyDto.state,
          city: createCompanyDto.city
        },
      }),
    );
    return Company.fromPrisma(company);
  }
}
