import * as prisma from "@prisma/client";

type CompanyConstructorArgs = {
  id: number,
  uuid: string,
  name: string,
  legalName: string,
  tradeName: string,
  taxId: string,
  state: string,
  city: string,
  logo?: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt?: Date,
};

export class Company {
  readonly id: number;
  readonly uuid: string;

  /**
   * Company nickname defined by the user.
   */
  readonly name: string;

  /**
   * The legal name is the name that appears in the formal documents.
   * 
   * These names often have a “legal ending” such as LLC, Inc., or LLP.
   */
  readonly legalName: string;

  /**
   * Trade/Business/Fictitious/DBA company name.
   */
  readonly tradeName: string;

  /**
   * Company Tax Identification Number. Depends on the jurisdiction.
   */
  readonly taxId: string;

  /**
   * Federated state.
   */
  readonly state: string;
  readonly city: string;
  readonly logo?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  constructor(args: CompanyConstructorArgs) {
    this.id = args.id;
    this.uuid = args.uuid;
    this.name = args.name;
    this.legalName = args.legalName;
    this.tradeName = args.tradeName;
    this.taxId = args.taxId;
    this.state = args.state;
    this.city = args.city;
    this.logo = args.logo;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }

  static fromPrisma(args: prisma.Company): Company {
    return new Company({
      ...args,
      legalName: args.legal_name,
      tradeName: args.trade_name,
      taxId: args.tax_id,
      logo: args.logo ?? undefined,
      createdAt: args.created_at,
      updatedAt: args.updated_at,
      deletedAt: args.deleted_at ?? undefined,
    });
  }
}
