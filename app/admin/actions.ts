"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { admin } from "@/src/db/schema";
import { SESSION_COOKIE } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  const [user] = await db
    .select()
    .from(admin)
    .where(and(eq(admin.username, username), eq(admin.password, password)))
    .limit(1);

  if (!user) {
    return { error: "Invalid username or password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, user.username, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
