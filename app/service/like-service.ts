"use server";
import db from "../lib/db";
import { revalidateTag } from "next/cache";
import getSession from "../lib/session";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  if (!session?.id) return;
  try {
    await db.like.create({
      data: { tweetId, userId: session.id },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch  {
//
  }
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  if (!session?.id) return;

  try {
    await db.like.delete({
      where: {
        tweetId_userId: {
          tweetId,
          userId: session.id,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch  {
  }
}