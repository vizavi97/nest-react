import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { User } from '../app/Entities/User';
import path from 'path';
import { Food } from '../app/entities/Food';
import { Roles } from '../app/entities/static/Roles';
import { BaseEntity } from '../app/entities/patterns/BaseEntity';

const logger = new Logger('MikroOrm');

const config = {
  entities: [User, Food, Roles, BaseEntity],
  migrations: {
    path: path.join(__dirname, '../migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  dbName: 'nest',
  debug: true,
  type: 'postgresql',
  logger: logger.log.bind(logger),
} as Options;

export default config;
