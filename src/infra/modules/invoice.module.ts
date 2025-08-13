import { Module } from '@nestjs/common';
import { InvoiceController } from '@infra/controllers/invoice';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { DatabaseModule } from './database.module';
import { ExceptionsModule } from './exceptions.module';
import { UpdateInvoiceStatusUseCase } from '@core/use-cases/invoice/update-status';
import { FindInvoiceByIdUseCase } from '@core/use-cases/invoice/find-by-id';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/account/find-by-api-key';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [InvoiceController],
  providers: [
    CreateInvoiceUseCase,
    UpdateInvoiceStatusUseCase,
    FindInvoiceByIdUseCase,
    ApiKeyGuard,
    FindByApiKeyAccountUseCase,
  ],
})
export class InvoiceModule {}
