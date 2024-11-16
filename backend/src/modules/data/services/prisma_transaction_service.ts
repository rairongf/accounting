import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, PrismaPromise } from '@prisma/client';
import { PrismaService } from './prisma_service';

@Injectable()
export class PrismaTransactionService {
  constructor(private readonly prisma: PrismaService) { }

  async handle<T>(
    arg:
      | PrismaPromise<any>[]
      | ((
        prisma: Omit<
          PrismaClient,
          '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
        >,
      ) => Promise<any>),
  ): Promise<T> {
    try {
      const argType = typeof arg;
      if (Array.isArray(arg)) {
        return (await this.prisma.$transaction(arg)) as unknown as T;
      } else if (argType === 'function') {
        return await this.prisma.$transaction(arg, { timeout: 20000 });
      }
      throw new InternalServerErrorException(`Unexpected [arg] type: ${argType}`);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
