import { PrismaClient, Prisma} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";


export const prismaInit = async (c: any, next: Next) => {
  // logic to initialize prisma client.
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  c.prisma = prisma; 
  await next();
};
