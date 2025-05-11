"use client";
import { useOptimistic } from "react";
import { useFormState } from "react-dom";
import { addTweetResponse } from "../service/response-service";
import { z } from "zod";

interface User {
  id: number;
  username: string;
}

interface ResponseItem {
  id: number;
  text: string;
  created_at: Date | string;
  tweetId: number;
  user: User;
}

interface ResponsesProps {
  initialResponses: ResponseItem[];
  tweetId: number;
  username: string;
}

type FormState = {
  fieldErrors?: { text?: string[] };
} | null;

export default function Responses({ initialResponses, tweetId, username }: ResponsesProps) {
  const responseSchema = z
    .string({ required_error: "Response is required." })
    .trim()
    .max(200, "Response must be 200 characters or less.");


  const [responses, addResponse] = useOptimistic<ResponseItem[], string>(
    initialResponses,
    (prev, newText) => [
      ...prev,
      {
        id: Date.now(),
        text: newText,
        created_at: new Date(),
        tweetId,
        user: { username, id: Infinity },
      },
    ]
  );

  const handleSubmit = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const text = formData.get("text");
    const validation = responseSchema.safeParse(text);
    if (validation.success) {
      addResponse(validation.data);
      await addTweetResponse(formData);
      return null;
    } else {
      return { fieldErrors: { text: validation.error.flatten().formErrors } };
    }
  };


  const [state, action] = useFormState<FormState, FormData>(handleSubmit, null);

  return (
    <div className="flex flex-col gap-3 w-full">
     <form action={action} className="flex gap-2 w-full">
      <input
        name="text"
        type="text"
        placeholder="Write a response"
        required
        className="flex-1 p-2 border-1 border-neutral-500 rounded bg-neutral-900 text-white"
      />
      <input type="hidden" name="tweetId" value={tweetId} />
      <button
        className="cursor-pointer
            px-6 py-2 rounded-md border border-[#7ff5dd]
            bg-transparent text-[#7ff5dd] text-base
            hover:bg-[#7ff5dd] hover:text-black
            transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>

      {state?.fieldErrors?.text && (
        <span className="text-sm text-red-500">{state.fieldErrors.text.join(", ")}</span>
      )}
      {responses.map((res) => (
        <div key={res.id} className="flex items-center gap-4 my-2 text-base">
          <strong className="w-1/4">{res.user.username}</strong>
          <span>{res.text}</span>
        </div>
      ))}
    </div>
  );
}
