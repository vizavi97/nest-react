import { Migration } from '@mikro-orm/migrations';

export class Migration20201125193803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "base_entity" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null);');

    this.addSql('create table "roles" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "status" varchar(255) not null default \'Guest\', "privilege" int4 not null default 1);');

    this.addSql('create table "food" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "name" varchar(255) not null, "cost" int4 not null, "size" int4 not null, "desc" varchar(255) not null, "img" varchar(255) not null);');

    this.addSql('create table "user" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "phone" varchar(255) not null, "email" varchar(255) null, "name" varchar(255) not null, "surname" varchar(255) not null, "password" varchar(255) not null, "address" varchar(255) null default null, "cash_back" int4 not null default 0, "role_id" int4 not null);');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_role_id_unique" unique ("role_id");');

    this.addSql('alter table "user" add constraint "user_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;');
  }

}
