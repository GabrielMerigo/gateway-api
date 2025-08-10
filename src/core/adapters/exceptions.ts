export enum ExceptionCode {
  NOT_FOUND = '001_NOT_FOUND',
  DUPLICATED_API_KEY = '002_DUPLICATED_API_KEY',
  INVOICE_NOT_FOUND = '003_INVOICE_NOT_FOUND',
  UNAUTHORIZED_ACCESS = '004_UNAUTHORIZED_ACCESS',
  NEED_TO_PASS_API_KEY = '005_NEED_TO_PASS_API_KEY',

  // Account
  INVALID_BALANCE = '001_INVALID_BALANCE',
  INSUFFICIENT_BALANCE = '002_INSUFFICIENT_BALANCE',
  ACCOUNT_NOT_FOUND = '003_ACCOUNT_NOT_FOUND',
  ACCOUNT_ALREADY_EXISTS = '004_ACCOUNT_ALREADY_EXISTS',
}

export const ErrorMessages = {
  [ExceptionCode.NOT_FOUND]: 'Não Encontrado',
  [ExceptionCode.DUPLICATED_API_KEY]: 'API Key já existe',
  [ExceptionCode.INVOICE_NOT_FOUND]: 'Fatura não encontrada',
  [ExceptionCode.UNAUTHORIZED_ACCESS]: 'Acesso não autorizado',
  [ExceptionCode.NEED_TO_PASS_API_KEY]: 'É necessário passar a API Key',

  // Account
  [ExceptionCode.INVALID_BALANCE]: 'Saldo inválido',
  [ExceptionCode.INSUFFICIENT_BALANCE]:
    'Saldo insuficiente para pagar a fatura',
  [ExceptionCode.ACCOUNT_NOT_FOUND]: 'Conta não encontrada',
  [ExceptionCode.ACCOUNT_ALREADY_EXISTS]: 'Conta já existe',
};
