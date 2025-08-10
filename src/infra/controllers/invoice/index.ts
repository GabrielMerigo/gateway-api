import { Body, Controller, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { Invoice } from '@core/entities/invoice';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly createInvoiceUseCase: CreateInvoiceUseCase) {}

  @Post()
  async createInvoice(@Body() data: CreateInvoiceDto): Promise<Invoice | void> {
    return await this.createInvoiceUseCase.execute(data);
  }
}
