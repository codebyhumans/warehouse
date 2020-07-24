import { db } from '@common/database'
import { IUnit } from '@common/database/types/unit'

export default class UnitsService {
  async getAllUnits() {
    return db<IUnit>('unit').select('*')
  }

  async getUnitById(id: number) {
    return db<IUnit>('unit').where({ id }).first()
  }

  async createUnit(name: string, measure: string): Promise<IUnit> {
    return db<IUnit>('unit').insert({ name, measure })
  }

  async deleteUnitById(id: number): Promise<number> {
    return db<IUnit>('unit').where({ id }).delete()
  }

  // TODO: data any?
  async updateUnit(id: number, data: any) {
    return db<IUnit>('unit').where({ id }).update(data)
  }
}

export const unitsService = new UnitsService()
