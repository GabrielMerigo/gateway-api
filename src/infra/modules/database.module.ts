import { Module } from '@nestjs/common';
import { DatabaseService } from '@infra/database/database.service';
import { UserRepository } from '@core/repositories/user';
import { InvoiceRepository } from '@core/repositories/invoice';
import { InvoiceDrizzleRepository } from '@infra/database/drizzle/repositories/invoice.drizzle-repository';
import { UserDrizzleRepository } from '@infra/database/drizzle/repositories/user.drizzle-repository';

@Module({
  providers: [
    DatabaseService,
    {
      useClass: UserDrizzleRepository,
      provide: UserRepository,
    },
    {
      useClass: InvoiceDrizzleRepository,
      provide: InvoiceRepository,
    },
  ],
  exports: [DatabaseService, InvoiceRepository, UserRepository],
})
export class DatabaseModule {}
