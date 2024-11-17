import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/data';

type DepartmentEntryData = {
  name: string;
  services: {
    id: number;
    name: string;
  }[];
};

@Injectable()
export class FindManyDepartmentsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async findMany(): Promise<DepartmentEntryData[]> {
    const departments = await this.prismaService.$transaction(async (prisma) => prisma.department.findMany({
      select: {
        name: true,
        services: {
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          }
        },
      },
      orderBy: {
        name: 'asc'
      }
    }), { timeout: 20000 });

    return departments;
  }
}