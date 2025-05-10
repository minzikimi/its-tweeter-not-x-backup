"use client";
import { useActionState } from "react";
import { uploadTweet } from "../service/tweet-service";

export default function AddTweet() {
  const [state, action] = useActionState(uploadTweet, null);
  return (
    <form
      action={action}
      className="p-5 flex flex-col gap-5 bg-neutral-900 rounded-xl shadow border border-neutral-800"
    >
      <div className="flex flex-col gap-2">
        <textarea
          name="tweet"
          required
          placeholder="What is happening?!"
          className="w-full p-4 rounded-lg resize-none bg-neutral-800 text-white text-base placeholder:text-base placeholder:text-neutral-400 border border-neutral-700 focus:outline-none focus:border-neutral-500 transition"
          rows={3}
        />
        {!state?.isSuccess && (
          <span className="text-red-400 text-sm">{state?.error.fieldErrors.tweet}</span>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`
            cursor-pointer
            px-6 py-2 rounded-md border border-[#7ff5dd]
            bg-transparent text-[#7ff5dd] text-base
            hover:bg-[#7ff5dd] hover:text-black
            transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          Post
        </button>
      </div>
    </form>
  );
}
