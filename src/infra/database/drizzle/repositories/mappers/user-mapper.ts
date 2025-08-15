import { User } from '@core/entities/user';
import { usersTable } from '../../schema';

export class UserMapper {
  static toEntity(result: typeof usersTable.$inferSelect): User {
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

  static toDatabase(user: User): typeof usersTable.$inferInsert {
    return {
      name: user.name,
      email: user.email,
      apiKey: user.apiKey,
      balance: user.balance,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
