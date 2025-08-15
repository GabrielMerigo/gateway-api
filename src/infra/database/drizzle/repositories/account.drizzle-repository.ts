import { accountsTable } from '../schema';
import { eq, sql } from 'drizzle-orm';
import { User } from '@core/entities/user';
import { UserRepository } from '@core/repositories/user';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@infra/database/drizzle/schema';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@infra/database/database.service';
import { UserMapper } from './mappers/user-mapper';

@Injectable()
export class UserDrizzleRepository implements UserRepository {
  private readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getConnection();
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query.accountsTable.findFirst({
      where: eq(accountsTable.id, id),
    });

    return result ? UserMapper.toEntity(result) : null;
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.query.accountsTable.findMany();
    return result.map((user) => UserMapper.toEntity(user));
  }

  async findByApiKey(apiKey: string): Promise<User | null> {
    const result = await this.db.query.accountsTable.findFirst({
      where: eq(accountsTable.apiKey, apiKey),
    });

    return result ? UserMapper.toEntity(result) : null;
  }

  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const result = await this.db
      .insert(accountsTable)
      .values({
        name: user.name,
        email: user.email,
        apiKey: user.apiKey,
        balance: user.balance,
      })
      .returning();

    return UserMapper.toEntity(result[0]);
  }

  async updateAccountInfo(
    user: Omit<User, 'balance' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.db
      .update(accountsTable)
      .set({
        name: user.name,
        apiKey: user.apiKey,
        email: user.email,
        updatedAt: new Date(),
      })
      .where(eq(accountsTable.id, user.id));
  }

  async updateBalance(user: Pick<User, 'id' | 'balance'>): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT balance FROM accounts WHERE id = ${user.id} FOR UPDATE`,
      );

      await tx
        .update(accountsTable)
        .set({ balance: user.balance })
        .where(eq(accountsTable.id, user.id));
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query.accountsTable.findFirst({
      where: eq(accountsTable.email, email),
    });

    return result ? UserMapper.toEntity(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(accountsTable).where(eq(accountsTable.id, id));
  }
}
