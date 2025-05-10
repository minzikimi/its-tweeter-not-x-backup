import { z } from "zod";

export const replySchema = z.object({
  content: z.string().min(1).max(280),
  tweetId: z.number(),
});

export const likeSchema = z.object({
  tweetId: z.number(),
});
