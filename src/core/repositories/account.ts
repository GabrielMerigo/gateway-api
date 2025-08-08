import { Account } from '../entities/account';

export abstract class AccountRepository {
  abstract create(
    account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Account>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByApiKey(apiKey: string): Promise<Account | null>;
  abstract updateAccountInfo(
    account: Omit<Account, 'balance' | 'createdAt' | 'updatedAt'>,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract updateBalance(
    account: Pick<Account, 'id' | 'balance'>,
  ): Promise<void>;
  abstract findAll(): Promise<Account[]>;
}
