import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  create_at = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  update_at = new Date();
}
