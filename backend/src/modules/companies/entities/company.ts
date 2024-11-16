type CompanyConstructorArgs = {
  id: number,
  uuid: string,
  name: string,
  legalName: string,
  tradeName: string,
  taxId: string,
  state: string,
  city: string,
  createdAt: Date,
  updatedAt: Date,
  logo?: string,
  deletedAt?: Date,
};

export class Company {
  private readonly id: number;
  private readonly uuid: string;

  /**
   * Company nickname defined by the user.
   */
  private readonly name: string;

  /**
   * The legal name is the name that appears in the formal documents.
   * 
   * These names often have a “legal ending” such as LLC, Inc., or LLP.
   */
  private readonly legalName: string;

  /**
   * Trade/Business/Fictitious/DBA company name.
   */
  private readonly tradeName: string;

  /**
   * Company Tax Identification Number. Depends on the jurisdiction.
   */
  private readonly taxId: string;

  /**
   * Federated state.
   */
  private readonly state: string;
  private readonly city: string;
  private readonly logo?: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt?: Date;

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
}
