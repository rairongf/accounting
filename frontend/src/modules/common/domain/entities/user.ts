import { BaseEntity, BaseEntityConstructorProps } from "./base";

type UserConstructorProps = BaseEntityConstructorProps & {
  email: string,
};

export class User extends BaseEntity {
  readonly email: string;

  constructor(args: UserConstructorProps){
    super({...args});
    this.email = args.email;
  }
}