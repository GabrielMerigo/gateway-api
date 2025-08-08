import { Account } from '@core/entities/account';
import { accountsTable } from '../../schema';

export class AccountMapper {
  static toEntity(result: typeof accountsTable.$inferSelect): Account {
    return {
      id: result.id.toString(),
      name: result.name,
      email: result.email,
      apiKey: result.apiKey,
      balance: result.balance,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  static toDatabase(account: Account): typeof accountsTable.$inferInsert {
    return {
      name: account.name,
      email: account.email,
      apiKey: account.apiKey,
      balance: account.balance,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
