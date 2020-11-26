import { BaseEntity } from './patterns/BaseEntity';
import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Roles } from './static/Roles';

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();
  }
  @Property({ nullable: false, unique: true })
  phone!: string;
  @Property({ nullable: true, unique: true })
  email?: string;
  @Property({ nullable: false })
  name!: string;
  @Property({ nullable: false })
  surname!: string;
  @Property({ nullable: false })
  password!: string;
  @Property({ nullable: true, default: null })
  address: string;
  @Property({ default: 0, nullable: false, length: 6 })
  cashBack: number;
  @OneToOne(() => Roles)
  role: Roles;
}
