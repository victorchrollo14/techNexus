import { PrismaClient} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";

declare global {
  namespace HonoMiddleware {
    interface Context {
      prisma: PrismaClient;
    }
  }
}

export const prismaInit = async (c: any, next: Next) => {
  try {
    // logic to initialize prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.prisma = prisma;
    await next();
  } catch (error) {
    console.log(error);
    return c.body("internal Server Error", 500);
  }
};
