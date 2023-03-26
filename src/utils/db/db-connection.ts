import { PrismaClient } from "@prisma/client"

import { applyMiddleware } from "./middleware-soft-delete"

const isDev = process.env.NODE_ENV !== "production"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: isDev ? ['query'] : [],
    log: [],
  })

if (isDev) globalForPrisma.prisma = prisma

applyMiddleware(prisma)

export const DB = prisma
