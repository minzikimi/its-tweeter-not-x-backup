"use client";

import Button from "@/app/components/btn";
import Input from "@/app/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions"; 
import { PASSWORD_MIN_LENGTH } from "@/app/lib/constants";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <main
      className="p-8 min-h-screen bg-black flex flex-col justify-center items-center"
      // style={{ backgroundImage: "url('/images/y2kbg.jpg')" }}
    >
      <div className="flex flex-col gap-2 mb-6 text-center w-full max-w-sm px-2">
        <h1 className="text-3xl font-bold text-white">Welcome to Its-tweeter-not-x</h1>
        <h2 className="text-lg text-neutral-400">Fill in the form below to join!</h2>
      </div>

      <form action={dispatch} className="flex flex-col gap-4 w-full max-w-sm px-2">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={
            state && "fieldErrors" in state
              ? state.fieldErrors.username
              : undefined
          }
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={
            state && "fieldErrors" in state
              ? state.fieldErrors.email
              : undefined
          }
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={
            state && "fieldErrors" in state
              ? state.fieldErrors.password
              : undefined
          }
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          minLength={PASSWORD_MIN_LENGTH}  
          required
          errors={
            state && "fieldErrors" in state
              ? state.fieldErrors.confirm_password
              : undefined
          }
        />
        <Button text="Create account" />
      </form>
    </main>
  );
}
