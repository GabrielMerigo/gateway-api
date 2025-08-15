import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByApiKey(apiKey: string): Promise<User | null>;
  abstract updateAccountInfo(
    user: Omit<User, 'balance' | 'createdAt' | 'updatedAt'>,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract updateBalance(user: Pick<User, 'id' | 'balance'>): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
}
