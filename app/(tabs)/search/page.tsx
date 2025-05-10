"use client";
import { useActionState } from "react";
import { searchTweets, TweetWithUser } from "./actions";

export default function Search() {
  const [tweets, formAction] = useActionState<TweetWithUser[], FormData>(searchTweets, []);

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="p-4 max-w-xl mx-auto text-white">
        <form action={formAction} className="flex gap-2 mb-6 pt-5">
          <input
            name="q"
            placeholder="Type to search tweets..."
            className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#7ff5dd] transition"
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-md border border-[#7ff5dd] bg-transparent text-[#7ff5dd] text-base  hover:bg-[#7ff5dd] hover:text-black transition-colors duration-150"
          >
            Search
          </button>
        </form>

        {tweets.length === 0 ? (
          <p className="text-neutral-400 text-center mt-10">No results found.</p>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-4"
              >
                <p className="text-lg">{tweet.tweet}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-[#7ff5dd] font-medium">
                    @{tweet.user.username}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {tweet.created_at
                      ? new Date(tweet.created_at).toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
