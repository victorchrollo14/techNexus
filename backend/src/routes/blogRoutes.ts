import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verifyUser } from "../middlewares/auth";
import { saveBlogInput } from "../utils/zod";

const blogRouter = new Hono();

blogRouter.get("/:id", (c: any) => {
  // requesting a particular blog.
  return c.text("get a particular blog route");
});

blogRouter.get("/bulk", (c) => {
  // requesting a bulk of blogs at once.
  return c.text("get a bulk of blogs ");
});

blogRouter.post("/save", verifyUser, async (c: any) => {
  // creating a new blog.
  try {
    const userId = c.get("user");
    const prisma: PrismaClient = c.prisma;
    const body = await c.req.json();

    const validateInput = saveBlogInput.safeParse(body);

    if (!validateInput.success) {
      c.status(400);
      return c.json({ error: "Bad Request, Invalid Inputs" });
    }

    const { title, content } = validateInput.data;
    const saveBlog = await prisma.blog.create({
      data: { authorId: userId, title: title, content: content },
    });
    return c.json({ message: "Saved the blog " });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
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
