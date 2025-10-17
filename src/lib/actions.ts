"use server";

import { cookies } from "next/headers";

export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  // The auth object from firebase-admin was removed as it's not needed for client-side operations.
  // This function is now a placeholder.
  (await cookies()).set("session", idToken, { maxAge: expiresIn, httpOnly: true, secure: true });
}

export async function clearSessionCookie() {
  (await cookies()).delete("session");
}
