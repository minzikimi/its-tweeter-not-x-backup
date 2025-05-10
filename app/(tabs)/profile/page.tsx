import Button from "@/app/components/btn";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/login");
  };
  return (
    <main className="p-8 min-h-screen bg-black text-white flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-bold text-neutral-400">
        Welcome <span className="text-white ">{user?.username}</span>!
      </h1>
      <Link
        href={`/users/${user.username}/edit`}
        className="text-[#7ff5dd] underline hover:text-[#68d9c6] transition-colors"
      >
        Edit Profile
      </Link>
      <form action={logOut} className="w-full max-w-xs flex flex-col items-center">
        <Button text="Log out" />
      </form>
    </main>
  );
}
