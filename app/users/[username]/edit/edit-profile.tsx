"use client";
import { updateProfile } from "./actions";

export default function EditProfileForm({
  user,
}: {
  user: { username: string; email: string; bio?: string };
}) {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <form
        action={updateProfile}
        className="space-y-4 max-w-md w-full bg-neutral-900 p-6 rounded-lg text-white"
      >
        <div>
          <label className="block mb-2 text-white">Username</label>
          <input
            name="username"
            defaultValue={user.username}
            className="w-full p-2 bg-black border border-[#7ff5dd] rounded text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-white">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={user.email}
            className="w-full p-2 bg-black border border-[#7ff5dd] rounded text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#7ff5dd] text-black py-2 rounded font-semibold hover:bg-[#68d9c6] transition-colors"
        >
          Update
        </button>
      </form>
    </div>
  );
}
