import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/data';
import { FindManyKpisQueryDto } from '../dtos';

type KpiEntryData = {
  name: string;
  sort: number;
  value?: number;
};

@Injectable()
export class FindManyKpisService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async findMany(query: FindManyKpisQueryDto): Promise<KpiEntryData[]> {
    const kpiTypes = await this.prismaService.$transaction(async (prisma) => prisma.kpiType.findMany({
      where: {
        name: {
          in: query.types
        }
      },
      select: {
        name: true,
        sort: true,
        kpis: {
          select: {
            value: true
          },
          orderBy: {
            created_at: 'desc'
          },
          take: query.amountPerType,
        }
      },
      orderBy: {
        sort: 'asc'
      }
    }), { timeout: 20000 });

    return kpiTypes.map((type) => ({
      name: type.name,
      sort: type.sort,
      value: type.kpis.at(0)?.value ?? undefined,
    }));
  }
}