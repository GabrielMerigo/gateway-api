import { FindByIdAccountUseCase } from '@core/use-cases/account/find-by-id';
import { AccountController } from '@infra/controllers/account';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { CreateAccountUseCase } from '@core/use-cases/account/create';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/account/find-by-api-key';
import { ExceptionsModule } from './exceptions.module';
import { UpdateBalanceUseCase } from '@core/use-cases/account/update-balance';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [AccountController],
  providers: [
    FindByIdAccountUseCase,
    FindAllAccountsUseCase,
    CreateAccountUseCase,
    FindByApiKeyAccountUseCase,
    UpdateBalanceUseCase,
  ],
})
export class AccountModule {}
