import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";

export async function isAdmin() {
  const store = await cookies();
  return store.has(SESSION_COOKIE);
}
