import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const blog = new Hono();

blog.get("/:id", (c:any) => {
  // requesting a particular blog.

const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  return c.text("get a particular blog route");
});

blog.get("/bulk", (c) => {
  // requesting a bulk of blogs at once.
  return c.text("get a bulk of blogs ");
});

blog.post("/", (c) => {
  // creating a new blog.
  return c.text("create a new blog ");
});

blog.get("/search", (c) => {
  // searching a list of blogs.
  return c.text("search for blogs related to a query");
});

blog.put("/:id", (c) => {
  // updating the blog.
  return c.text("Updating an existing blog");
});

export default blog;
