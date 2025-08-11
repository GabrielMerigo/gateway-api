import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { Invoice } from '@core/entities/invoice';
import { UpdateInvoiceStatusDto } from './dtos/update-status';
import { UpdateInvoiceStatusUseCase } from '@core/use-cases/invoice/update-status';
import { FindInvoiceByIdUseCase } from '@core/use-cases/invoice/find-by-id';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly updateInvoiceStatusUseCase: UpdateInvoiceStatusUseCase,
    private readonly findInvoiceByIdUseCase: FindInvoiceByIdUseCase,
  ) {}

  @Post()
  async createInvoice(@Body() data: CreateInvoiceDto): Promise<Invoice | void> {
    return await this.createInvoiceUseCase.execute(data);
  }

  @Get(':id')
  async findInvoiceById(@Param('id') id: string): Promise<Invoice | void> {
    return await this.findInvoiceByIdUseCase.execute(id);
  }

  @Patch(':id/status')
  async updateInvoiceStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateInvoiceStatusDto,
  ): Promise<Invoice | void> {
    return await this.updateInvoiceStatusUseCase.execute(id, status);
  }
}
