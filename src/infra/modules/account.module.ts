import { FindByIdAccountUseCase } from '@core/use-cases/account/find-by-id';
import { AccountController } from '@infra/controllers/account';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { FindAllAccountsUseCase } from '@core/use-cases/account/find-all';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [FindByIdAccountUseCase, FindAllAccountsUseCase],
})
export class AccountModule {}
