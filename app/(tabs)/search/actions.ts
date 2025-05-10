"use server";
import db from "@/app/lib/db";
import { Prisma } from "@prisma/client";

export type TweetWithUser = Prisma.TweetGetPayload<{ include: { user: true } }>;

export async function searchTweets(
  prevState: unknown,
  formData: FormData
): Promise<TweetWithUser[]> {
  const query = formData.get("q") as string;
  if (!query) return [];
  return db.tweet.findMany({
    where: { tweet: { contains: query } },
    include: { user: true },
  });
}

