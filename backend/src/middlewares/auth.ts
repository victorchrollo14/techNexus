import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const verifyUser = async (c: Context, next: Next) => {
  // code to verifyUser;
  try {
    let token = c.req.header("Authorization");

    token = token?.split(" ")[1];
    if (token) {
      const { user } = await verify(token, c.env.JWT_SECRET);
      console.log("user making request: ", user);
      c.set("user", user);
      await next();
    }

    c.status(404);
    return c.json({ error: "Unauthorized Access" });
  } catch (error) {
    console.log(error);
    c.status(500);
    c.json({ error: "Internal Server Error" });
  }

  await next();
};
