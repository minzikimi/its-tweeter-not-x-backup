"use server";
import { z } from "zod";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  bio: z.string().optional(),
});

export async function updateProfile(formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    return redirect(`/users/${data.username}/edit?error=validation`);
  }

  const session = await getSession();
  if (!session?.id) return redirect("/login");

  await db.user.update({
    where: { id: session.id },
    data: result.data,
  });

  revalidatePath("/profile");
  return redirect("/profile"); 
}
