import * as prisma from "@prisma/client";

type UserConstructorArgs = {
  id: number,
  uuid: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt?: Date,
};

export class User {
  readonly id: number;
  readonly uuid: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  constructor(args: UserConstructorArgs) {
    this.id = args.id;
    this.uuid = args.uuid;
    this.email = args.email;
    this.password = args.password;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }

  static fromPrisma(args: prisma.User): User {
    return new User({
      ...args,
      createdAt: args.created_at,
      updatedAt: args.updated_at,
      deletedAt: args.deleted_at ?? undefined,
    });
  }
}
