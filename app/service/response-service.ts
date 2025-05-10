"use server";
import db from "../lib/db";
import getSession from "../lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function addTweetResponse(formData: FormData) {
  const responseSchema = z
    .string({ required_error: "Response is required." })
    .trim()
    .max(200, "Response must be 200 characters or less.");

  const text = formData.get("text");
  const tweetId = formData.get("tweetId");

  const validation = responseSchema.safeParse(text);
  if (!validation.success) {
    return { error: validation.error.flatten(), isSuccess: false };
  }

  const session = await getSession();
  if (!session?.id) return;

  await db.response.create({
    data: {
      userId: session.id,
      tweetId: Number(tweetId),
      content: validation.data, 
    },
  });

  revalidateTag(`tweet-responses-${tweetId}`);
}
