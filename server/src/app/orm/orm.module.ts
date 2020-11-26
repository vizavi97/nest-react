import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../Entities/User';
import config from '../../config/mikro-orm.config';
import { BaseEntity } from '../entities/patterns/BaseEntity';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User, BaseEntity],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
