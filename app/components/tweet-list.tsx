"use client";

import { useState } from "react";
import Link from "next/link";
import { getMoreTweets, deleteTweet } from "@/app/(tabs)/(home)/action";
import { InitialTweets } from "@/app/(tabs)/(home)/page";
import ConfirmModal from "./confirm-modal";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(initialTweets.length < 5);

  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;
    const result = await deleteTweet(deleteTargetId);
    if (result?.isSuccess) {
      setTweets((prev) => prev.filter((tweet) => tweet.id !== deleteTargetId));
      setModalOpen(false);
      setDeleteTargetId(null);
    } else {
      alert(result?.error || "삭제에 실패했습니다.");
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    const newTweets = await getMoreTweets(nextPage);
    if (newTweets.length > 0) {
      setTweets(newTweets);
      setPage(nextPage);
      if (newTweets.length < 5) setIsLastPage(true);
    } else {
      setIsLastPage(true);
    }
  };

  const handlePrev = async () => {
    const prevPage = Math.max(page - 1, 0);
    const newTweets = await getMoreTweets(prevPage);
    setTweets(newTweets);
    setPage(prevPage);
    setIsLastPage(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-black min-h-screen p-8">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="border-b border-neutral-700 pb-4 flex justify-between items-start group"
          >
            <div className="flex-1">
              <Link
                href={`/tweets/${tweet.id}`}
                className="text-lg font-medium text-white transition-colors"
              >
                {tweet.tweet}
              </Link>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(tweet.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => openDeleteModal(tweet.id)}
              className="ml-4 p-2 text-gray-400 hover:neutral-300 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete tweet"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md disabled:opacity-50 transition-colors"
          >
            ← Previous
          </button>
          <span className="self-center text-sm text-gray-400">{page + 1}</span>
          <button
            onClick={handleNext}
            disabled={isLastPage}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md disabled:opacity-50 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        message="Confirm your deletion!"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
