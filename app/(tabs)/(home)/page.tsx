import db from "@/app/lib/db";
import TweetList from "@/app/components/tweet-list";
import { Prisma } from "@prisma/client";
import AddTweet from "@/app/components/add-tweeter"; 
export const dynamic = "force-dynamic";


async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;
export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <main className="p-8 bg-black min-h-screen text-white">
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#7ff5dd] via-white to-[#7ff5dd] uppercase mb-8 select-none text-center">
        All Tweets
      </h1>
      <AddTweet /> 
      <TweetList initialTweets={initialTweets} /> 
    </div>
  </main>
  );
}
