import { Module } from '@nestjs/common';
import { InvoiceController } from '@infra/controllers/invoice';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { DatabaseModule } from './database.module';
import { ExceptionsModule } from './exceptions.module';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [InvoiceController],
  providers: [CreateInvoiceUseCase],
})
export class InvoiceModule {}
