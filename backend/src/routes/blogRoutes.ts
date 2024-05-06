import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verifyUser } from "../middlewares/auth";
import { saveBlogInput } from "../utils/zod";
import { z } from "zod";

const blogIdSchema = z.coerce.number();
const blogRouter = new Hono();

blogRouter.get("/bulk", async (c: any) => {
  // requesting a bulk of blogs at once.
  try {
    const prisma: PrismaClient = c.prisma;

    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        authorId: true,
        content: true,
        tags: true,
        Comments: true,
        likeCount: true,
        commentCount: true,
      },
      take: 30,
      where: {
        published: true,
      },
    });
    console.log(blogs);
    return c.json({ blogs });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

blogRouter.get("/:id", async (c: any) => {
  // requesting a particular blog.
  try {
    const prisma: PrismaClient = c.prisma;
    const blogId = c.req.param("id");

    const isValid = blogIdSchema.safeParse(blogId);
    if (!isValid.success) {
      c.status(400);
      return c.json({ error: "Bad Request, Invalid data" });
    }

    const blog = await prisma.blog.findFirst({
      select: {
        title: true,
        authorId: true,
        content: true,
        tags: true,
        Comments: true,
        likeCount: true,
        commentCount: true,
      },
      where: {
        id: isValid.data,
        published: true,
      },
    });
    return c.json({ blog });
  } catch (error) {
    console.log(error);
    c.status(500);
    c.json({ error: "Internal Server Error" });
  }
});

blogRouter.post("/save", verifyUser, async (c: any) => {
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
    await prisma.blog.create({
      data: { authorId: userId, title: title, content: content },
    });
    return c.json({ message: "Saved the blog " });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
});

blogRouter.get("/search/:query", async (c: any) => {
  // searching a list of blogs
  try {
    const prisma: PrismaClient = c.prisma;
    const query: string = c.req.param("query");
    console.log(query);
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        authorId: true,
        content: true,
        tags: true,
        Comments: true,
        likeCount: true,
        commentCount: true,
      },
      take: 30,
      where: {
        OR: [
          {
            content: {
              contains: query,
            },
          },
          {
            title: {
              contains: query,
            },
          },
        ],
        AND: { published: true },
      },
    });
    return c.json({ blogs });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
});

blogRouter.put("/:id", (c) => {
  // updating the blog.
  return c.text("Updating an existing blog");
});

export default blogRouter;
