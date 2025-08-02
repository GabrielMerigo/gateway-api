import { Account } from '../entities/account-entity';

export abstract class AccountRepository {
  abstract create(
    account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Account>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByApiKey(apiKey: string): Promise<Account | null>;
  abstract update(account: Account): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Account[]>;
}
