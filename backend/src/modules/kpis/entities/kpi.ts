import * as prisma from "@prisma/client";

type KpiConstructorArgs = {
  id: number;
  uuid: string;
  type: string;
  value?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export class Kpi {
  readonly id: number;
  readonly uuid: string;

  readonly type: string;
  readonly value?: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  constructor(args: KpiConstructorArgs) {
    this.id = args.id;
    this.uuid = args.uuid;
    this.type = args.type;
    this.value = args.value;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }

  static fromPrisma(args: prisma.Kpi): Kpi {
    return new Kpi({
      ...args,
      value: args.value ?? undefined,
      createdAt: args.created_at,
      updatedAt: args.updated_at,
      deletedAt: args.deleted_at ?? undefined,
    });
  }
}
