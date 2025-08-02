import { accountsTable } from '../schema';
import { eq } from 'drizzle-orm';
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

  async create(account: Account): Promise<void> {
    await this.db.insert(accountsTable).values({
      name: account.name,
      email: account.email,
      apiKey: account.apiKey,
      balance: account.balance,
    });
  }

  async update(account: Account): Promise<void> {
    await this.db
      .update(accountsTable)
      .set({
        name: account.name,
        email: account.email,
        balance: account.balance,
        updatedAt: new Date(),
      })
      .where(eq(accountsTable.id, parseInt(account.id)));
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(accountsTable)
      .where(eq(accountsTable.id, parseInt(id)));
  }
}
