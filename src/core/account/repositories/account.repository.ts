import { Account } from '../entities/account.entity';

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findById(id: string): Promise<Account | null>;
  findByApiKey(apiKey: string): Promise<Account | null>;
  update(account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
