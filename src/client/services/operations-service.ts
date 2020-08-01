import { db } from '@common/database'
import { IOperation, IOperationType } from '@common/database/types/operation'

class OperationsService {
  private baseFields = [
    'o.id',
    'o.type',
    'o.qty',
    'o.price',
    'o.providerId',
    'p.name as providerName',
    'o.consider',
    'o.createdAt',
    'o.createdAt',
  ]

  private typeProperties = {
    [IOperationType.EXPENDITURE]: 'Расход',
    [IOperationType.ARRIVAL]: 'Приход',
    [IOperationType.AUDIT]: 'Ревизия',
  }

  getOperationTypeProperty(type: IOperationType) {
    return this.typeProperties[type]
  }

  async getOperationsByProduct(productId: number): Promise<IOperation[]> {
    return db<IOperation>('operation as o')
      .where({ productId })
      .leftJoin('provider as p', 'o.providerId', 'p.id')
      .select(this.baseFields)
  }
}

export const operationsService = new OperationsService()
