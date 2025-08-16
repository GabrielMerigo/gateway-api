import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CryptographyAdapter } from '@core/adapters/cryptography';

@Injectable()
export class BcryptIntegration implements CryptographyAdapter {
  private HASH_SALT_ROUNDS = 10;
  private algorithm = 'aes-256-ctr';
  private secretKey = Buffer.from(process.env.TOTP_SECRET_KEY!, 'hex');
  private iv = randomBytes(16);

  generateHash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_ROUNDS);
  }

  generateLookupHash(plain: string): string {
    return createHash('sha256').update(plain).digest('hex');
  }

  compare(plainText: string, encryptText: string): Promise<boolean> {
    return compare(plainText, encryptText);
  }

  encrypt(plain: string): string {
    const cipher = createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      this.iv,
    );
    const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
    return this.iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(encryptedText: string): string {
    const [ivHex, contentHex] = encryptedText.split(':');
    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      Buffer.from(ivHex, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(contentHex, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  }
}
