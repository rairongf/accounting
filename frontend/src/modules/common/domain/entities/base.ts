export type BaseEntityConstructorProps = {
  id: string;
  uuid: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
};

export abstract class BaseEntity {
  readonly id: string;
  readonly uuid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;
  constructor(attributes: BaseEntityConstructorProps) {
    this.id = attributes.id;
    this.uuid = attributes.uuid;
    this.createdAt = new Date(attributes.createdAt);
    this.updatedAt = new Date(attributes.updatedAt);
    this.deletedAt = attributes.deletedAt ? new Date(attributes.deletedAt) : undefined;
  }
}