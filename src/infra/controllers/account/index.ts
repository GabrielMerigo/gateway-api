import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { CreateAccountUseCase } from '@core/use-cases/account/create';

import { Body, Controller, Get, Post, Patch } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create';
import { Account } from '@core/entities/account';
import { UpdateBalanceDto } from './dtos/update-balance';
import { UpdateBalanceUseCase } from '@core/use-cases/account/update-balance';
import { CurrentAccount } from '@shared/decorators/current-account.decorator';
import { RequireApiKey } from '@shared/decorators/require-api-key.decorator';

@Controller('account')
export class AccountController {
  constructor(
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly updateBalanceUseCase: UpdateBalanceUseCase,
  ) {}

  @Get()
  @RequireApiKey()
  async getAccounts(@CurrentAccount() account: Account): Promise<Account[]> {
    return await this.findAllAccountsUseCase.execute(account);
  }

  @Post()
  async createAccount(@Body() data: CreateAccountDto) {
    return await this.createAccountUseCase.execute(data);
  }

  @Patch(':id/balance')
  @RequireApiKey()
  async updateBalance(
    @Body() data: UpdateBalanceDto,
    @CurrentAccount() account: Account,
  ) {
    return await this.updateBalanceUseCase.execute({
      id: account.id,
      balance: data.balance,
    });
  }
}
