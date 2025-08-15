import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health.module';
import { DatabaseModule } from './database.module';
import { InvoiceModule } from './invoice.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    UserModule,
    InvoiceModule,
  ],
})
export class AppModule {}
