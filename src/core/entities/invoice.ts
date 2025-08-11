export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum InvoicePaymentType {
  PIX = 'PIX',
  CREDIT_CARD = 'CARTÃO',
  BOLETO = 'BOLETO',
}

export interface Invoice {
  id: string;
  accountId: string;
  amount: number;
  status: InvoiceStatus;
  description?: string;
  paymentType: InvoicePaymentType;
  createdAt: Date;
  updatedAt: Date;
  card?: CreditCard;
}

export type CreditCard = {
  expiryMonth: number;
  expiryYear: number;
  cardholderName: string;
  cardLastDigits: string;
};
