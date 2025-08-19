import { CryptographyAdapter } from '@core/adapters/cryptography';
import { BcryptIntegration } from '@infra/integrations/bcrypt';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: CryptographyAdapter,
      useClass: BcryptIntegration,
    },
  ],
  exports: [CryptographyAdapter],
})
export class CryptographyModule {}
