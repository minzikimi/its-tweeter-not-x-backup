import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import LikeButton from "@/app/components/like-button";
import Responses from "@/app/components/response";
import getSession from "@/app/lib/session";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
    include: {
      likes: true,
      responses: { include: { user: true } },
      user: true,
    },
  });
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string }
}) {
  const { id } =  params;
  const numId = Number(id);
  if (isNaN(numId)) return notFound();
  const tweet = await getTweet(numId);
  if (!tweet) return notFound();

  const session = await getSession();
  const isLiked = tweet.likes.some(like => like.userId === session?.id);

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-xl w-full mx-auto">
        <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#7ff5dd] via-white to-[#7ff5dd] uppercase mb-8 select-none text-center">
          Tweet Peek
        </h1>
        <div className="bg-neutral-900 rounded-xl shadow-lg border border-neutral-800 p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-lg">{tweet.user.username}</span>
            <span className="text-xs text-neutral-400">
              {tweet.created_at.toLocaleString()}
            </span>
          </div>
          <div className="text-xl font-semibold mb-4">{tweet.tweet}</div>
          <LikeButton
            isLiked={isLiked}
            likeCount={tweet.likes.length}
            tweetId={tweet.id}
          />
        </div>
        <div className="mt-8">
          <Responses
            initialResponses={tweet.responses.map(r => ({
              ...r,
              text: r.content,
            }))}
            tweetId={tweet.id}
            username={session?.username ?? "Anonymous"}
          />
        </div>
      </div>
    </main>
  );
}