import { FindManyUnitArgs, UnitCreateInput, UnitUpdateInput } from '@prisma/client';
import { prisma } from '@client/libs/prisma';

export default class UnitsService {
  async getAllUnits(options: FindManyUnitArgs) {
    return prisma.unit.findMany(options);
  }

  async getUnitById(id: number) {
    return prisma.unit.findOne({
      where: {
        id,
      },
    });
  }

  async createUnit(data: UnitCreateInput) {
    return prisma.unit.create({ data });
  }

  async updateUnit(id: number, data: UnitUpdateInput) {
    return prisma.unit.update({
      where: {
        id,
      },
      data,
    });
  }
}

export const unitsService = new UnitsService();
