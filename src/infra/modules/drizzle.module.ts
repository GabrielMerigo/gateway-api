import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@infra/database/drizzle/schema';

export const DRIZZLE = Symbol('DRIZZLE');

@Module({
  imports: [],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: dbUrl,
          ssl: true,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [],
})
export class DrizzleModule {}
