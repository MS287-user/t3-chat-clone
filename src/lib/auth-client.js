import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: "https://t3-chat-clone-chi.vercel.app/",
});
