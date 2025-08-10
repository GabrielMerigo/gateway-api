import { InvoiceStatus } from '@core/entities/invoice';
import { InvoiceRepository } from '@core/repositories/invoice';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateInvoiceStatusUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(id: string, status: InvoiceStatus): Promise<void> {
    return await this.invoiceRepository.updateStatus(id, status);
  }
}
