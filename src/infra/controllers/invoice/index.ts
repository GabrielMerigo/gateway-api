import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create';
import { CreateInvoiceUseCase } from '@core/use-cases/invoice/create';
import { Invoice } from '@core/entities/invoice';
import { UpdateInvoiceStatusDto } from './dtos/update-status';
import { UpdateInvoiceStatusUseCase } from '@core/use-cases/invoice/update-status';
import { FindInvoiceByIdUseCase } from '@core/use-cases/invoice/find-by-id';
import { Account } from '@core/entities/account';
import { RequireApiKey } from '@shared/decorators/require-api-key.decorator';
import { CurrentAccount } from '@shared/decorators/current-account.decorator';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly updateInvoiceStatusUseCase: UpdateInvoiceStatusUseCase,
    private readonly findInvoiceByIdUseCase: FindInvoiceByIdUseCase,
  ) {}

  @Post()
  @RequireApiKey()
  async createInvoice(
    @Body() data: CreateInvoiceDto,
    @CurrentAccount() account: Account,
  ): Promise<Invoice | void> {
    return await this.createInvoiceUseCase.execute(data, account);
  }

  @Get(':id')
  @RequireApiKey()
  async findInvoiceById(@Param('id') id: string): Promise<Invoice | void> {
    return await this.findInvoiceByIdUseCase.execute(id);
  }

  @Patch(':id/status')
  @RequireApiKey()
  async updateInvoiceStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateInvoiceStatusDto,
    @CurrentAccount() account: Account,
  ): Promise<Invoice | void> {
    return await this.updateInvoiceStatusUseCase.execute(id, status, account);
  }
}
