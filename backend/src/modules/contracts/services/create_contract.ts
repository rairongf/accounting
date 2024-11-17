import { Injectable } from '@nestjs/common';
import { PrismaTransactionService } from 'src/modules/data';
import { CreateContractDto } from '../dtos';
import { Contract } from '../entities/contract';

@Injectable()
export class CreateContractService {
  constructor(
    private readonly prismaTransactionService: PrismaTransactionService,
  ) { }

  async create(dto: CreateContractDto): Promise<Contract> {
    const contract = await this.prismaTransactionService.handle<any>(
      async (prisma) => prisma.contract.create({
        data: {
          effective_date: dto.effectiveDate,
          signed_at: dto.signedAt,
          fee: dto.fee,
          company: {
            connect: {
              id: dto.companyId
            }
          },
          services: {
            connect: [...dto.services.map((serviceId) => ({ id: serviceId }))]
          }
        },
      })
    );
    return Contract.fromPrisma(contract);
  }
}
