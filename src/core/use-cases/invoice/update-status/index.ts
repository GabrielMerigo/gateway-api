import { ExceptionsAdapter } from '@core/adapters';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { User } from '@core/entities/user';
import { InvoiceStatus } from '@core/entities/invoice';
import { UserRepository } from '@core/repositories/user';
import { InvoiceRepository } from '@core/repositories/invoice';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateInvoiceStatusUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly accountRepository: UserRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(
    id: string,
    status: InvoiceStatus,
    user: User,
  ): Promise<void> {
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

    if (status === InvoiceStatus.PAID) {
      if (user.balance < invoice.amount) {
        return this.exception.conflict({
          message: ErrorMessages[ExceptionCode.INSUFFICIENT_BALANCE],
          code: ExceptionCode.INSUFFICIENT_BALANCE,
        });
      }

      user.balance -= invoice.amount;
      await this.accountRepository.updateBalance({
        id: user.id,
        balance: user.balance,
      });
    }

    return await this.invoiceRepository.updateStatus(id, status);
  }
}
