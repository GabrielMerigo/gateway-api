import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FindAllAccountsUseCase } from '@core/use-cases/user/find-all';
import { CreateAccountUseCase } from '@core/use-cases/user/create';
import { ExceptionsModule } from './exceptions.module';
import { UpdateBalanceUseCase } from '@core/use-cases/user/update-balance';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/user/find-by-api-key';
import { UserController } from '@infra/controllers/user';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  controllers: [UserController],
  providers: [
    FindAllAccountsUseCase,
    CreateAccountUseCase,
    UpdateBalanceUseCase,
    FindByApiKeyAccountUseCase,
    ApiKeyGuard,
  ],
})
export class UserModule {}
