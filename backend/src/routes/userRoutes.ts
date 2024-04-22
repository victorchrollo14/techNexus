import { Hono } from "hono";

const app = new Hono();

app.post("/register/google", (c) => {
  // code to register via google.
  return c.text("register with google");
});

app.post("/login/google", (c) => {
  // code to login via google;
  return c.text("login with google");
});

app.post("/register/github", (c:any) => {
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
