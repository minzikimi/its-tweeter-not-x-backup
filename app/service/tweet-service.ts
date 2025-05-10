"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";
import db from "../lib/db";
import getSession from "../lib/session";

const LIMIT_NUMBER = 2;

export const getInitialTweets = async () => {
  return db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: { created_at: "desc" },
  });
};

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    skip: page * LIMIT_NUMBER,
    take: LIMIT_NUMBER,
    orderBy: { created_at: "desc" },
  });

  const TWEETS_TOTAL_COUNT = await db.tweet.count();
  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * (page + 1);
  return { tweets, isLastPage };
}


const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required.",
  }),
});

export async function uploadTweet(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }
  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}
