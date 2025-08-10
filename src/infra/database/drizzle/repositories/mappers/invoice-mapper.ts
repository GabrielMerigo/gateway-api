import { Invoice } from '@core/entities/invoice';
import { invoicesTable } from '../../schema';

export class InvoiceMapper {
  static toEntity(invoice: Invoice): Invoice {
    return {
      id: invoice.id,
      accountId: invoice.accountId,
      amount: invoice.amount,
      status: invoice.status,
      description: invoice.description,
      paymentType: invoice.paymentType,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      card: {
        number: invoice.card.number,
        cvv: invoice.card.cvv,
        expiryMonth: invoice.card.expiryMonth,
        expiryYear: invoice.card.expiryYear,
        cardholderName: invoice.card.cardholderName,
        cardLastDigits: invoice.card.cardLastDigits,
      },
    };
  }

  static toDatabase(invoice: Invoice): typeof invoicesTable.$inferInsert {
    return {
      accountId: invoice.accountId,
      amount: invoice.amount,
      status: invoice.status,
      description: invoice.description,
      paymentType: invoice.paymentType,
      number: invoice.card.number,
      cvv: invoice.card.cvv,
      expiryMonth: invoice.card.expiryMonth,
      expiryYear: invoice.card.expiryYear,
      cardholderName: invoice.card.cardholderName,
      cardLastDigits: invoice.card.cardLastDigits,
    };
  }
}
