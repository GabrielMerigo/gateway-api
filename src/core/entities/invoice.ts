export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum InvoicePaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
}

export interface Invoice {
  id: string;
  accountId: string;
  amount: number;
  status: InvoiceStatus;
  description: string;
  paymentType: InvoicePaymentType;
  cardLastDigits?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreditCard = {
  number: string;
  cvv: string;
  expiryMonth: number;
  expiryYear: number;
  cardholderName: string;
};
