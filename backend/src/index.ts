import { Hono } from "hono";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import { prismaInit } from "./middlewares/prisma";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  "/api/*",
  cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }),
);
app.use(prismaInit);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/", (c: any) => {
  return c.text("Hello Hono!");
});

export default app;
