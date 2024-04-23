import { Hono } from "hono";
import { sign } from "hono/jwt";
import { Prisma, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { hashPassword } from "../utils/encrypt";

const app = new Hono();

app.post("/auth/register", async (c: any) => {
  try {
    const prisma: PrismaClient = c.prisma;
    const body = await c.req.json();

    const { name, email, password } = body;
    const hashedPassword = await hashPassword(password);

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists)
      return c.body("User already Registered, try logging in.", 409);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        normalAuth: true,
        password: hashedPassword,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "User registerd Successfully", auth_token: jwt });
  } catch (error) {
    console.log(error);
    return c.body("Internal server Error", 500);
  }
});

app.post("auth/register/google", (c) => {
  // code to register via google.
  return c.text("register with google");
});

app.post("auth/login/google", (c) => {
  // code to login via google;
  return c.text("login with google");
});

app.post("/register/github", (c: any) => {
  // code to register via github.
  console.log(c.prisma);
  return c.text("register with github");
});

app.post("/login/github", (c) => {
  // code to login via github
  return c.text("login  with github");
});

app.get("/:id", (c) => {
  // code to get user data;
  return c.text("returns user data ");
});

export default app;
