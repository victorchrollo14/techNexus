import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";

const blogRouter = new Hono();

blogRouter.get("/:id", (c: any) => {
  // requesting a particular blog.

  return c.text("get a particular blog route");
});

blogRouter.get("/bulk", (c) => {
  // requesting a bulk of blogs at once.
  return c.text("get a bulk of blogs ");
});

blogRouter.post("/", async (c: any) => {
  // creating a new blog.
  const body = await c.req.json();
  return c.text("create a new blog ");
});

blogRouter.get("/search", (c) => {
  // searching a list of blogs.
  return c.text("search for blogs related to a query");
});

blogRouter.put("/:id", (c) => {
  // updating the blog.
  return c.text("Updating an existing blog");
});

export default blogRouter;
