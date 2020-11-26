import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../patterns/BaseEntity';

@Entity()
export class Roles extends BaseEntity {
  constructor() {
    super();
  }
  @Property({ default: 'Guest' })
  status!: string;
  @Property({ default: 1 })
  privilege!: number;
}
