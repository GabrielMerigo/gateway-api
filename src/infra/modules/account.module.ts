import { AccountController } from '@infra/controllers/account';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';
import { CreateAccountUseCase } from '@core/use-cases/account/create';
import { ExceptionsModule } from './exceptions.module';
import { UpdateBalanceUseCase } from '@core/use-cases/account/update-balance';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/account/find-by-api-key';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [AccountController],
  providers: [
    FindAllAccountsUseCase,
    CreateAccountUseCase,
    UpdateBalanceUseCase,
    FindByApiKeyAccountUseCase,
    ApiKeyGuard,
  ],
})
export class AccountModule {}
