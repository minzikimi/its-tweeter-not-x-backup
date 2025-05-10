"use client";
import { useOptimistic } from "react";
import { likeTweet } from "../service/like-service";
import { dislikeTweet } from "../service/like-service";
import { startTransition } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({ isLiked, likeCount, tweetId }: LikeButtonProps) {
  const [state, toggle] = useOptimistic(
    { isLiked, likeCount },
    (prev) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    })
  );

  const onClick = () => {
    startTransition(() => {
      toggle(null);
      if (state.isLiked) dislikeTweet(tweetId);
      else likeTweet(tweetId);
    });
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full p-2 border transition-colors
        ${
          state.isLiked
            ? " text-[#7ff5dd] border-[#7ff5dd]"
            : "border-neutral-600 text-neutral-300 hover:bg-neutral-800"
        }`}
    >
      <span>
        {state.isLiked ? state.likeCount : `Like (${state.likeCount})`}
      </span>
    </button>
  );
}
