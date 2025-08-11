import { ExceptionsAdapter } from '@core/adapters';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { Invoice } from '@core/entities/invoice';
import { InvoiceRepository } from '@core/repositories/invoice';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindInvoiceByIdUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(id: string): Promise<Invoice | void> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      return this.exception.notFound({
        message: ErrorMessages[ExceptionCode.INVOICE_NOT_FOUND],
        code: ExceptionCode.INVOICE_NOT_FOUND,
      });
    }

    return invoice;
  }
}
