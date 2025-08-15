import { FindAllAccountsUseCase } from '@core/use-cases/user/find-all';
import { CreateAccountUseCase } from '@core/use-cases/user/create';

import { Body, Controller, Get, Post, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/create';
import { User } from '@core/entities/user';
import { UpdateBalanceDto } from './dtos/update-balance';
import { UpdateBalanceUseCase } from '@core/use-cases/user/update-balance';
import { RequireApiKey } from '@shared/decorators/require-api-key.decorator';
import { CurrentUser } from '@shared/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly updateBalanceUseCase: UpdateBalanceUseCase,
  ) {}

  @Get()
  async getAccounts(): Promise<User[]> {
    return await this.findAllAccountsUseCase.execute();
  }

  @Post()
  async createAccount(@Body() data: CreateUserDto) {
    return await this.createAccountUseCase.execute(data);
  }

  @Patch(':id/balance')
  @RequireApiKey()
  async updateBalance(
    @Body() data: UpdateBalanceDto,
    @CurrentUser() user: User,
  ) {
    return await this.updateBalanceUseCase.execute({
      id: user.id,
      balance: data.balance,
    });
  }
}
