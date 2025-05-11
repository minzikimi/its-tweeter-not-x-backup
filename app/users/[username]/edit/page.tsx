import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { notFound } from "next/navigation";
import EditProfileForm from "./edit-profile";

export default async function EditProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  if (!session?.id) notFound();

  const { username } = await params;

  const user = await db.user.findUnique({
    where: { username },
    select: { id: true, username: true, email: true, bio: true },
  });

  if (!user) notFound();
  if (session.id !== user.id) notFound(); // id로 비교!

  return <EditProfileForm user={{
    ...user,
    bio: user.bio ?? undefined,
  }} />;
}
