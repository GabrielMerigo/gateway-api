import { accountsTable } from '../schema';
import { eq, sql } from 'drizzle-orm';
import { Account } from '@core/entities/account-entity';
import { AccountRepository } from '@core/repositories/account-repository';
import { AccountMapper } from './mappers/account-mapper';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@infra/database/drizzle/schema';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@infra/database/database.service';

@Injectable()
export class AccountDrizzleRepository implements AccountRepository {
  private readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getConnection();
  }

  async findById(id: string): Promise<Account | null> {
    const result = await this.db.query.accountsTable.findFirst({
      where: eq(accountsTable.id, parseInt(id)),
    });

    return result ? AccountMapper.toEntity(result) : null;
  }

  async findAll(): Promise<Account[]> {
    const result = await this.db.query.accountsTable.findMany();
    return result.map((account) => AccountMapper.toEntity(account));
  }

  async findByApiKey(apiKey: string): Promise<Account | null> {
    const result = await this.db.query.accountsTable.findFirst({
      where: eq(accountsTable.apiKey, apiKey),
    });

    return result ? AccountMapper.toEntity(result) : null;
  }

  async create(
    account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Account> {
    const result = await this.db
      .insert(accountsTable)
      .values({
        name: account.name,
        email: account.email,
        apiKey: account.apiKey,
        balance: account.balance,
      })
      .returning();

    return AccountMapper.toEntity(result[0]);
  }

  async updateAccountInfo(
    account: Omit<Account, 'balance' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    await this.db
      .update(accountsTable)
      .set({
        name: account.name,
        apiKey: account.apiKey,
        email: account.email,
        updatedAt: new Date(),
      })
      .where(eq(accountsTable.id, parseInt(account.id)));
  }

  async updateBalance(account: Pick<Account, 'id' | 'balance'>): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT balance FROM accounts WHERE id = ${account.id} FOR UPDATE`,
      );

      await tx
        .update(accountsTable)
        .set({ balance: account.balance })
        .where(eq(accountsTable.id, parseInt(account.id)));
    });
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(accountsTable)
      .where(eq(accountsTable.id, parseInt(id)));
  }
}
