import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { Prisma, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { hashPassword, verifyPassword } from "../utils/encrypt";

const app = new Hono();

app.post("/auth/register", async (c: any) => {
  try {
    const prisma: PrismaClient = c.prisma;
    const body = await c.req.json();

    const { name, email, password } = body;

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists)
      return c.body("User already Registered, try logging in.", 409);

    const hashedPassword = await hashPassword(password);
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

app.post("auth/login", async (c: any) => {
  const prisma: PrismaClient = c.prisma;
  const body = await c.req.json();

  const { email, password } = body;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    c.status(409);
    return c.json({ error: "User Doesn't exist Sign up first." });
  }

  const storedPassword = user["password"];
  if (storedPassword && user.normalAuth) {
    const matchPassword = await verifyPassword(storedPassword, password);
    if (!matchPassword) {
      c.status(409);
      return c.json({
        error: "Password Doesn't match, try a different password",
      });
    }
  } else {
    c.status(409);
    return c.json({
      error: "Password doesn't exist, try using google or github auth",
    });
  }

  const jwt = await sign({ user: user.id }, c.env.JWT_SECRET);

  return c.json({ message: "Login Successful", auth_token: jwt });
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
