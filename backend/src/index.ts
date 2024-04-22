import { Hono } from "hono";
import user from "./routes/userRoutes";
import blog from "./routes/blogRoutes";
import { prismaInit } from "./middlewares/prisma";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use(prismaInit);

app.route("/api/user", user);
app.route("/api/blog", blog);

app.get("/", (c: any) => {
  return c.text("Hello Hono!");
});

export default app;
