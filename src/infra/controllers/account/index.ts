import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { FindByIdAccountUseCase } from '@core/use-cases/account/find-by-id';
import { CreateAccountUseCase } from '@core/use-cases/account/create';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/account/find-by-api-key';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Headers,
} from '@nestjs/common';
import { CreateAccountDto } from './dtos/create';
import { Account } from '@core/entities/account-entity';
import { UpdateBalanceDto } from './dtos/update-balance';
import { UpdateBalanceUseCase } from '@core/use-cases/account/update-balance';

@Controller('account')
export class AccountController {
  constructor(
    private readonly findByIdAccountUseCase: FindByIdAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findByApiKeyAccountUseCase: FindByApiKeyAccountUseCase,
    private readonly updateBalanceUseCase: UpdateBalanceUseCase,
  ) {}

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return await this.findByIdAccountUseCase.execute(id);
  }

  @Get()
  async getAccountByApiKey(
    @Headers('api-key') apiKey: string,
  ): Promise<Account | void> {
    return await this.findByApiKeyAccountUseCase.execute(apiKey);
  }

  @Get()
  async getAccounts(): Promise<Account[]> {
    return await this.findAllAccountsUseCase.execute();
  }

  @Post()
  async createAccount(@Body() data: CreateAccountDto) {
    return await this.createAccountUseCase.execute(data);
  }

  @Patch(':id/balance')
  async updateBalance(@Param('id') id: string, @Body() data: UpdateBalanceDto) {
    return await this.updateBalanceUseCase.execute({
      id,
      balance: data.balance,
    });
  }
}
