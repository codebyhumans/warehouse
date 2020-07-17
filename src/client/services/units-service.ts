import { db } from '@common/database';
import { IUnit } from '@common/database/types/unit';

export default class UnitsService {
  async getAllUnits() {
    return db<IUnit>('Unit').select('*');
  }

  async getUnitById(id: number) {
    return db<IUnit>('Unit').where({ id }).first();
  }

  async createUnit(name: string, measure: string): Promise<IUnit> {
    return db<IUnit>('Unit').insert({ name, measure });
  }

  // TODO: data any?
  async updateUnit(id: number, data: any) {
    return db<IUnit>('Unit').where({ id }).update(data);
  }
}

export const unitsService = new UnitsService();
