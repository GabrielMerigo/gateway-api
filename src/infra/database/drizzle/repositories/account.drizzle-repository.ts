import { AccountRepository } from '@core/account/repositories/account.repository';
import { accountsTable } from '../schema';
import { Account } from '@core/account/entities/account.entity';

export class AccountDrizzleRepository implements AccountRepository {
  constructor(private readonly db: DrizzleDatabase) {}

  async create(account: Account): Promise<void> {
    await db.insert(accountsTable).values(account);
  }
}
