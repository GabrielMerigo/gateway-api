import { Account } from '../entities/account-entity';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByApiKey(apiKey: string): Promise<Account | null>;
  abstract update(account: Account): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Account[]>;
}
