import * as prisma from "@prisma/client";

type ContractConstructorArgs = {
  id: number;
  uuid: string;
  fee: number;
  effectiveDate: Date;
  signedAt: Date;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export class Contract {
  readonly id: number;
  readonly uuid: string;

  readonly fee: number;
  readonly effectiveDate: Date;
  readonly signedAt: Date;
  readonly companyId: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  constructor(args: ContractConstructorArgs) {
    this.id = args.id;
    this.uuid = args.uuid;
    this.fee = args.fee;
    this.effectiveDate = args.effectiveDate;
    this.signedAt = args.signedAt;
    this.companyId = args.companyId;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }

  static fromPrisma(args: prisma.Contract): Contract {
    return new Contract({
      ...args,
      effectiveDate: args.effective_date,
      signedAt: args.signed_at,
      companyId: args.company_id,
      createdAt: args.created_at,
      updatedAt: args.updated_at,
      deletedAt: args.deleted_at ?? undefined,
    });
  }
}
