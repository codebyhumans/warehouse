import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: [],
  errorFormat: undefined,
});

export default prisma;
