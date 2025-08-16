export abstract class CryptographyAdapter {
  abstract compare(plainText: string, encryptText: string): Promise<boolean>;
  abstract decrypt(encryptedText: string): string;
  abstract encrypt(plain: string): string;
  abstract generateHash(plain: string): Promise<string>;
  abstract generateLookupHash(plain: string): string;
}

export abstract class CryptographySignatureAdapter {
  abstract sign(plain: string, isMasterUser: boolean): string;
  abstract verify(
    plain: string,
    signature: string,
    isMasterUser: boolean,
  ): boolean;
  abstract getPublicKey(isMasterUser: boolean): string;
}
