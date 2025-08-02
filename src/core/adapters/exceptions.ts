export enum ExceptionCode {
  NOT_FOUND = '001_NOT_FOUND',
  DUPLICATED_API_KEY = '002_DUPLICATED_API_KEY',
  INVOICE_NOT_FOUND = '003_INVOICE_NOT_FOUND',
  UNAUTHORIZED_ACCESS = '004_UNAUTHORIZED_ACCESS',
}

export const ErrorMessages = {
  [ExceptionCode.NOT_FOUND]: 'Não Encontrado',
};
