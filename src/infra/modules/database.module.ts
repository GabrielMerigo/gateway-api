import { Module } from '@nestjs/common';
import { DatabaseService } from '@infra/database/database.service';
import { AccountDrizzleRepository } from '@infra/database/drizzle/repositories/account.drizzle-repository';
import { AccountRepository } from '@core/repositories/account-repository';

@Module({
  providers: [
    DatabaseService,
    {
      useClass: AccountDrizzleRepository,
      provide: AccountRepository,
    },
  ],
  exports: [DatabaseService, AccountRepository],
})
export class DatabaseModule {}
