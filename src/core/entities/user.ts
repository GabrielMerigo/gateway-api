export interface User {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  password: string;
  isTotpEnabled: boolean;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
