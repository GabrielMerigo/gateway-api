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

  async create(
    invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.db.insert(invoicesTable).values(invoice);
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
          cardLastDigits: result.cardLastDigits as string | undefined,
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
        cardLastDigits: invoice.cardLastDigits as string | undefined,
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
