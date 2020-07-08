import { FindManyUnitArgs } from '@prisma/client';
import { prisma } from '@client/libs/prisma';

export default class UnitsService {
  async getAllUnits(options: FindManyUnitArgs) {
    return prisma.unit.findMany(options);
  }
}

export const unitsService = new UnitsService();
