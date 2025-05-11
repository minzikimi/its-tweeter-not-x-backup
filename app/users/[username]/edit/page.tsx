import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { notFound } from "next/navigation";
import EditProfileForm from "./edit-profile";

export default async function EditProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const session = await getSession();
  if (!session?.id) notFound();

  const user = await db.user.findUnique({
    where: { username },
    select: { id: true, username: true, email: true, bio: true },
  });

  if (!user) notFound();
  if (session.id !== user.id) notFound();

  return <EditProfileForm user={{
    ...user,
    bio: user.bio ?? undefined,
  }} />;
}
