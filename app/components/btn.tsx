"use client"; 

import {  useFormStatus } from "react-dom";


interface ButtonProps{
    text:string;
}

export default function Button({text}:ButtonProps){

    const {pending} = useFormStatus();

    return(
        <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 mt-4 rounded-md font-semibold transition ${
          pending
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#7ff5dd] text-black hover:bg-[#68d9c6]"
        }`}
      >
        {pending ? (
          //loading spinner
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      ) : (
        text
      )}
      </button>
    )
}