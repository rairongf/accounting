import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ServerPaginatedResponse } from 'src/modules/common';
import { PrismaTransactionService } from 'src/modules/data';
import { FindManyCompaniesQueryDto } from '../dtos';
import { Company } from '../entities/company';

@Injectable()
export class FindManyCompaniesService {
  constructor(
    private readonly prismaTransactionService: PrismaTransactionService,
  ) { }

  async findMany(query: FindManyCompaniesQueryDto): Promise<ServerPaginatedResponse<Company>> {
    let whereClause: Prisma.CompanyWhereInput = {};
    if (query.name) {
      whereClause = {
        ...whereClause, OR: [...(whereClause.OR ?? []), {
          name: {
            contains: query.name,
            mode: 'insensitive'
          }
        },
        {
          legal_name: {
            contains: query.name,
            mode: 'insensitive'
          }
        },
        {
          trade_name: {
            contains: query.name,
            mode: 'insensitive'
          }
        }]
      }
    }
    if (query.taxId) {
      whereClause = {
        ...whereClause, OR: [...(whereClause.OR ?? []),
        {
          tax_id: {
            contains: query.taxId,
            mode: 'insensitive'
          }
        }]
      }
    }

    const [companies, totalElements] = await this.prismaTransactionService.handle<[any[], number]>(
      async (prisma) => {
        const elements = await prisma.company.findMany({
          where: whereClause,
          orderBy: [
            { created_at: 'desc' },
            { name: 'desc' },
            { legal_name: 'desc' },
            { trade_name: 'desc' },
          ],
          skip: query.limit * (query.page - 1),
          take: query.limit,
        });

        const totalElements = await prisma.company.count({
          where: whereClause
        });

        return [elements, totalElements];
      },
    );

    return {
      elements: companies.map((c) => Company.fromPrisma(c)),
      currentPage: query.page,
      totalElements: totalElements,
      totalPages: totalElements === 0 ? 1 : Math.ceil(totalElements / query.limit),
    }
  }
}