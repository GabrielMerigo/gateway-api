import { Module } from '@nestjs/common';
import { DatabaseService } from '@infra/database/database.service';
import { AccountDrizzleRepository } from '@infra/database/drizzle/repositories/account.drizzle-repository';
import { AccountRepository } from '@core/repositories/account';
import { InvoiceRepository } from '@core/repositories/invoice';
import { InvoiceDrizzleRepository } from '@infra/database/drizzle/repositories/invoice.drizzle-repository';

@Module({
  providers: [
    DatabaseService,
    {
      useClass: AccountDrizzleRepository,
      provide: AccountRepository,
    },
    {
      useClass: InvoiceDrizzleRepository,
      provide: InvoiceRepository,
    },
  ],
  exports: [DatabaseService, AccountRepository, InvoiceRepository],
})
export class DatabaseModule {}
