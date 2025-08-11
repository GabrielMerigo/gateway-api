import { ExceptionsAdapter } from '@core/adapters';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { InvoiceStatus } from '@core/entities/invoice';
import { AccountRepository } from '@core/repositories/account';
import { InvoiceRepository } from '@core/repositories/invoice';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateInvoiceStatusUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(id: string, status: InvoiceStatus): Promise<void> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      return this.exception.notFound({
        message: ErrorMessages[ExceptionCode.INVOICE_NOT_FOUND],
        code: ExceptionCode.INVOICE_NOT_FOUND,
      });
    }

    if (invoice.status === InvoiceStatus.PAID) {
      return this.exception.conflict({
        message: ErrorMessages[ExceptionCode.INVOICE_ALREADY_PAID],
        code: ExceptionCode.INVOICE_ALREADY_PAID,
      });
    }

    const account = await this.accountRepository.findById(invoice.accountId);

    if (!account) {
      return this.exception.notFound({
        message: ErrorMessages[ExceptionCode.ACCOUNT_NOT_FOUND],
        code: ExceptionCode.ACCOUNT_NOT_FOUND,
      });
    }

    if (status === InvoiceStatus.PAID) {
      if (account.balance < invoice.amount) {
        return this.exception.conflict({
          message: ErrorMessages[ExceptionCode.INSUFFICIENT_BALANCE],
          code: ExceptionCode.INSUFFICIENT_BALANCE,
        });
      }

      account.balance -= invoice.amount;
      await this.accountRepository.updateBalance({
        id: account.id,
        balance: account.balance,
      });
    }

    return await this.invoiceRepository.updateStatus(id, status);
  }
}
