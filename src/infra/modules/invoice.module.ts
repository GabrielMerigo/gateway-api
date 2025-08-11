import { Module } from '@nestjs/common';
import { InvoiceController } from '@infra/controllers/invoice';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { DatabaseModule } from './database.module';
import { ExceptionsModule } from './exceptions.module';
import { UpdateInvoiceStatusUseCase } from '@core/use-cases/invoice/update-status';
import { FindInvoiceByIdUseCase } from '@core/use-cases/invoice/find-by-id';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [InvoiceController],
  providers: [
    CreateInvoiceUseCase,
    UpdateInvoiceStatusUseCase,
    FindInvoiceByIdUseCase,
  ],
})
export class InvoiceModule {}
