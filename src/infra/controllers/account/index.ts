import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { FindByIdAccountUseCase } from '@core/use-cases/account/find-by-id';
import { CreateAccountUseCase } from '@core/use-cases/account/create';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/account/find-by-api-key';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create';
import { Account } from '@core/entities/account-entity';

@Controller('account')
export class AccountController {
  constructor(
    private readonly findByIdAccountUseCase: FindByIdAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findByApiKeyAccountUseCase: FindByApiKeyAccountUseCase,
  ) {}

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return await this.findByIdAccountUseCase.execute(id);
  }

  @Get('api-key/:apiKey')
  async getAccountByApiKey(
    @Param('apiKey') apiKey: string,
  ): Promise<Account | null> {
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
}
