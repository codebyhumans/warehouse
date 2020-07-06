import { FindManyUnitArgs } from '@prisma/client';
import client from '@libs/prisma';

export default class UnitsService {
  async getAllUnits(options: FindManyUnitArgs) {
    return client.unit.findMany(options);
  }
}

export const unitsService = new UnitsService();
