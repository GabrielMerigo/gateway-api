import { Invoice, InvoiceStatus } from '../entities/invoice';

export abstract class InvoiceRepository {
  abstract create(
    invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<void>;
  abstract findById(id: string): Promise<Invoice | null>;
  abstract findByAccountId(accountId: string): Promise<Invoice[]>;
  abstract update(
    invoice: Omit<Invoice, 'createdAt' | 'updatedAt'>,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract updateStatus(id: string, status: InvoiceStatus): Promise<void>;
}
