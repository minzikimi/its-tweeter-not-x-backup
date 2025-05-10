"use server";

import db from "@/app/lib/db";

export async function getMoreTweets(page: number) {
  const take = 5;
  const skip = page * take;

  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    skip,
    take,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}


export async function deleteTweet(id: number) {
  try {
    await db.tweet.delete({
      where: { id },
    });
    return { isSuccess: true };
  } catch {
    return { isSuccess: false, error: "Failed to delete." };
  }
}
