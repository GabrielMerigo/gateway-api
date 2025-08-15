import { ExceptionsAdapter } from '@core/adapters';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { User } from '@core/entities/user';
import {
  CreditCard,
  Invoice,
  InvoicePaymentType,
  InvoiceStatus,
} from '@core/entities/invoice';
import { InvoiceRepository } from '@core/repositories/invoice';
import { Injectable } from '@nestjs/common';

interface CreateInvoiceParams {
  amount: number;
  description: string;
  paymentType: InvoicePaymentType;
  accountId: string;
  card: CreditCard;
}

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(
    data: CreateInvoiceParams,
    user: User,
  ): Promise<Invoice | void> {
    if (user.balance < data.amount) {
      return this.exception.badRequest({
        message: ErrorMessages[ExceptionCode.INSUFFICIENT_BALANCE],
        code: ExceptionCode.INSUFFICIENT_BALANCE,
      });
    }

    return await this.invoiceRepository.create({
      accountId: data.accountId,
      amount: data.amount,
      description: data.description,
      paymentType: data.paymentType,
      status: InvoiceStatus.PENDING,
      card: {
        expiryMonth: data.card.expiryMonth,
        expiryYear: data.card.expiryYear,
        cardholderName: data.card.cardholderName,
        cardLastDigits: data.card.cardLastDigits,
      },
    });
  }
}
