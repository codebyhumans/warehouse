export enum IOperationType {
  ARRIVAL = 1,
  EXPENDITURE = 2,
  AUDIT = 3,
}

export interface IOperation {
  id: number
  number: string
  price: number
  type: IOperationType
  qty: number
  consider: boolean
  providerId?: number
  providerName?: string
  productId: number
  userId: number
  createdAt: Date
}
