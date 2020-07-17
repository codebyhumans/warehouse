export interface IProvider {
  id: number;
  name: string;
  address?: string;
  taxId?: string;
  phone?: string;
  email?: string;
  bankName?: string;
  bankAddress?: string;
  bankMfo?: string;
  bankExpense?: string;
}
