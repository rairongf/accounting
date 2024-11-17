import { Injectable } from '@nestjs/common';
import { PrismaTransactionService } from 'src/modules/data';

@Injectable()
export class DeleteCompanyService {
  constructor(
    private readonly prismaTransactionService: PrismaTransactionService,
  ) { }

  async delete(id: number) {
    await this.prismaTransactionService.handle<any>(
      async (prisma) => {
        await prisma.contract.deleteMany({
          where: {
            company_id: id
          }
        });

        await prisma.company.delete({
          where: { id: id },
        });
      },
    );
  }
}