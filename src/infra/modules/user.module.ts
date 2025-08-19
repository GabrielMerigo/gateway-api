import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FindAllAccountsUseCase } from '@core/use-cases/user/find-all';
import { CreateUserUseCase } from '@core/use-cases/user/create';
import { ExceptionsModule } from './exceptions.module';
import { UpdateBalanceUseCase } from '@core/use-cases/user/update-balance';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/user/find-by-api-key';
import { UserController } from '@infra/controllers/user';
import { LoginUseCase } from '@infra/controllers/auth';
import { CryptographyModule } from './cryptography.module';
import { TokenModule } from './token.module';

@Module({
  imports: [DatabaseModule, ExceptionsModule, CryptographyModule, TokenModule],
  controllers: [UserController],
  providers: [
    FindAllAccountsUseCase,
    CreateUserUseCase,
    UpdateBalanceUseCase,
    FindByApiKeyAccountUseCase,
    ApiKeyGuard,
    LoginUseCase,
  ],
})
export class UserModule {}
