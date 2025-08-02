import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { FindByIdAccountUseCase } from '@core/use-cases/account/find-by-id';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(
    private readonly findByIdAccountUseCase: FindByIdAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
  ) {}

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return this.findByIdAccountUseCase.execute(id);
  }

  @Get()
  async getAccounts() {
    return this.findAllAccountsUseCase.execute();
  }
}
