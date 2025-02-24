import { createCookieSessionStorage } from '@shopify/remix-oxygen';

const {getSession, commitSession, destroySession} = createCookieSessionStorage(
  {
    cookie: {
      name: "2c.cId",
      value: 123123123123123123,
      httpOnly: false,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secure: false,
    }
  }
)

export { getSession, commitSession, destroySession };
