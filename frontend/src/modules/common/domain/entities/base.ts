export type BaseEntityConstructorProps = {
  id: string;
  createdAt: Date | string;
};

export abstract class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  constructor(attributes: BaseEntityConstructorProps) {
    this.id = attributes.id;
    this.createdAt = new Date(attributes.createdAt);
  }
}