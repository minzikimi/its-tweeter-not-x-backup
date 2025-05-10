
"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";  
import db from "@/app/lib/db";
import { PASSWORD_MIN_LENGTH } from "@/app/lib/constants";
import { cookies } from "next/headers";



const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .trim()
      .toLowerCase(),

    email: z
      .string()
      .email()
      .toLowerCase(),

    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH),

    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username, email, password, confirm_password }, ctx) => {
    const [existingUser, existingEmail] = await Promise.all([
      db.user.findUnique({
        where: { username },
        select: { id: true }
      }),
      db.user.findUnique({
        where: { email },
        select: { id: true }
      }),
    ]);

    if (existingUser) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
    }

    if (existingEmail) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
    }

    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
      });
    }
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);
  

  if (!result.success) {
    return result.error.flatten();  
  } else {

    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: {
        id: true,
      },
    });


    const cookieStore = await cookies();  
    const cookie = await getIronSession(cookieStore, {
        cookieName: "sotpotatis",
        password: process.env.COOKIE_PASSWORD!
    });

   
  // @ts-expect-error: iron-session  there is no type for the id, so i add this to add user id to sesson temporarily
  cookie.id = user.id;
    await cookie.save();


    return { success: true };
  }
}
