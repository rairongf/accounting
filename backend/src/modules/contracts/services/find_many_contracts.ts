import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ServerPaginatedResponse } from 'src/modules/common';
import { PrismaService } from 'src/modules/data';
import { FindManyContractsQueryDto } from '../dtos';
import { Contract } from '../entities/contract';

type ContractEntryData = {
  company: string;
  effectiveDate: Date;
  signedAt: Date;
  fee: number;
  department: string;
};

@Injectable()
export class FindManyContractsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async findMany(query: FindManyContractsQueryDto): Promise<ServerPaginatedResponse<ContractEntryData>> {
    const orderByClause: Prisma.ContractOrderByWithRelationInput = {
      [query.sortBy]: query.sortBy === 'company'
        ? { name: query.sortDirection }
        : query.sortDirection
    };

    const [elements, totalElements] = await this.prismaService.$transaction(async (prisma) => {
      const elements = await prisma.contract.findMany({
        select: {
          id: true,
          uuid: true,
          effective_date: true,
          signed_at: true,
          fee: true,
          company_id: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
          company: {
            select: {
              name: true
            }
          },
          services: {
            select: {
              department: {
                select: {
                  name: true
                }
              },
            },
            orderBy: query.sortBy === 'department' ? { department: { name: query.sortDirection } } : undefined
          }
        },
        orderBy: query.sortBy === 'department' ? undefined : orderByClause,
        skip: query.limit * (query.page - 1),
        take: query.limit,
      });

      const totalElements = await prisma.contract.count();

      return [elements, totalElements];
    }, { timeout: 20000 });

    const mappedElements = elements.map((e) => {
      const contract = Contract.fromPrisma({ ...e });

      const departmentsNames = new Set(e.services.map((service) => service.department.name));

      return {
        company: e.company.name,
        effectiveDate: contract.effectiveDate,
        signedAt: contract.signedAt,
        fee: contract.fee,
        department: [...departmentsNames].join(', '),
      };
    });

    return {
      elements: query.sortBy !== 'department'
        ? mappedElements
        : mappedElements.sort((a, b) => {
          const ascendingComparison = a.department
            .replaceAll(', ', '')
            .localeCompare(
              b.department.replaceAll(', ', ''),
              ['en', 'pt'],
              { sensitivity: 'base', ignorePunctuation: true }
            );

          return query.sortDirection === 'asc'
            ? ascendingComparison
            : ascendingComparison * -1;
        }),
      currentPage: query.page,
      totalElements: totalElements,
      totalPages: totalElements === 0 ? 1 : Math.ceil(totalElements / query.limit),
    };
  }
}