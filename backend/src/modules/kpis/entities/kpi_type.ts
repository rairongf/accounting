import * as prisma from "@prisma/client";

type KpiTypeConstructorArgs = {
  name: string;
  sort: number;
};

export class KpiType {
  static allTypes = ['TOTAL_VALUE', 'ACTIVE_CONTRACTS_COUNT', 'ACTIVE_COMPANIES_COUNT', 'MEAN_CONTRACTS_BY_COMPANIES'];
  readonly name: string;
  readonly sort: number;

  constructor(args: KpiTypeConstructorArgs) {
    this.name = args.name;
    this.sort = args.sort;
  }

  static fromPrisma(args: prisma.KpiType): KpiType {
    return new KpiType({ ...args });
  }
}
