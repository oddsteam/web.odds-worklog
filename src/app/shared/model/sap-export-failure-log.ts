export interface SapExportFailureLog {
  id?: string;
  createdAt: string;
  role: string;
  startDate: string;
  endDate: string;
  dateEffective: string;
  incomeId: string;
  userId: string;
  bankAccountName: string;
  rowIndex: number;
  lineKind: string;
  errorMessage: string;
  underlyingError?: string;
}
