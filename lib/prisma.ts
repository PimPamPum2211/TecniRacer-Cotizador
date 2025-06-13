import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const logQueries = process.env.PRISMA_LOG_QUERIES === 'true';

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(logQueries ? { log: ['query'] } : {});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
