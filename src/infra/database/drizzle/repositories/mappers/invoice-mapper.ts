import { Invoice } from '@core/entities/invoice';

export class InvoiceMapper {
  static toEntity(invoice: Invoice): Invoice {
    return {
      id: invoice.id,
      accountId: invoice.accountId,
      amount: invoice.amount,
      status: invoice.status,
      description: invoice.description,
      paymentType: invoice.paymentType,
      cardLastDigits: invoice.cardLastDigits,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }

  static toDatabase(invoice: Invoice): typeof invoicesTable.$inferInsert {
    return {
      accountId: invoice.accountId,
      amount: invoice.amount,
      status: invoice.status,
      description: invoice.description,
      paymentType: invoice.paymentType,
      cardLastDigits: invoice.cardLastDigits,
    };
  }
}
