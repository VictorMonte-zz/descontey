import { Module } from '@nestjs/common';
import { databaseProviders } from '../../infrastructure/provider/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}