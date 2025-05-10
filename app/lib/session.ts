import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  username?: string;
}

export default async function getSession() {
  // cookies()가 promise이므로 await 사용하자
  const cookieStore = await cookies();

  return getIronSession<SessionContent>(cookieStore, {
    cookieName: "sotpotatis",
    password: process.env.COOKIE_PASSWORD!,
  });
}
