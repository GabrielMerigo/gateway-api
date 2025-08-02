import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@infra/database/drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DatabaseService {
  private db: NodePgDatabase<typeof schema>;

  constructor(private configService: ConfigService) {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: true,
    });

    this.db = drizzle(pool, { schema });
  }

  getConnection(): NodePgDatabase<typeof schema> {
    return this.db;
  }
}
