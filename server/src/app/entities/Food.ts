import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './patterns/BaseEntity';

@Entity()
export class Food extends BaseEntity {
  constructor() {
    super();
  }
  @Property()
  name: string;

  @Property()
  cost: number;

  // how long in sm
  @Property()
  size: number;

  @Property()
  desc: string;

  @Property()
  img: string;
}
