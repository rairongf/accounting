import * as prisma from "@prisma/client";

type TokenConstructorArgs = {
  id: number,
  uuid: string,
  accessToken: string,
  refreshToken: string,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
};

export class Token {
  readonly id: number;
  readonly uuid: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(args: TokenConstructorArgs) {
    this.id = args.id;
    this.uuid = args.uuid;
    this.accessToken = args.accessToken;
    this.refreshToken = args.refreshToken;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }

  static fromPrisma(args: prisma.Token): Token {
    return new Token({
      ...args,
      userId: args.user_id,
      accessToken: args.access_token,
      refreshToken: args.refresh_token,
      createdAt: args.created_at,
      updatedAt: args.updated_at,
    });
  }
}
