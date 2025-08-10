import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '@core/repositories/invoice';
import { DatabaseService } from '@infra/database/database.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '@infra/database/drizzle/schema';
import { invoicesTable } from '@infra/database/drizzle/schema';
import {
  Invoice,
  InvoicePaymentType,
  InvoiceStatus,
} from '@core/entities/invoice';
import { InvoiceMapper } from './mappers/invoice-mapper';
import { eq } from 'drizzle-orm';

@Injectable()
export class InvoiceDrizzleRepository implements InvoiceRepository {
  private readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getConnection();
  }

  async updateStatus(id: string, status: InvoiceStatus): Promise<void> {
    await this.db
      .update(invoicesTable)
      .set({ status })
      .where(eq(invoicesTable.id, id));
  }

  async create(
    invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.db.insert(invoicesTable).values({
      ...invoice,
      number: invoice.card.number,
      cvv: invoice.card.cvv,
      expiryMonth: invoice.card.expiryMonth,
      expiryYear: invoice.card.expiryYear,
      cardholderName: invoice.card.cardholderName,
      cardLastDigits: invoice.card.cardLastDigits,
    });
  }

  async findById(id: string): Promise<Invoice | null> {
    const result = await this.db.query.invoicesTable.findFirst({
      where: eq(invoicesTable.id, id),
    });

    return result
      ? InvoiceMapper.toEntity({
          ...result,
          paymentType: result.paymentType as InvoicePaymentType,
          status: result.status as InvoiceStatus,
          card: {
            number: result.number,
            cvv: result.cvv,
            expiryMonth: result.expiryMonth,
            expiryYear: result.expiryYear,
            cardholderName: result.cardholderName,
            cardLastDigits: result.cardLastDigits as string,
          },
        })
      : null;
  }

  async findByAccountId(accountId: string): Promise<Invoice[]> {
    const result = await this.db.query.invoicesTable.findMany({
      where: eq(invoicesTable.accountId, accountId),
    });

    return result.map((invoice) =>
      InvoiceMapper.toEntity({
        ...invoice,
        paymentType: invoice.paymentType as InvoicePaymentType,
        status: invoice.status as InvoiceStatus,
        card: {
          number: invoice.number,
          cvv: invoice.cvv,
          expiryMonth: invoice.expiryMonth,
          expiryYear: invoice.expiryYear,
          cardholderName: invoice.cardholderName,
          cardLastDigits: invoice.cardLastDigits as string,
        },
      }),
    );
  }

  async update(
    invoice: Omit<Invoice, 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.db
      .update(invoicesTable)
      .set(invoice)
      .where(eq(invoicesTable.id, invoice.id));
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(invoicesTable).where(eq(invoicesTable.id, id));
  }
}
