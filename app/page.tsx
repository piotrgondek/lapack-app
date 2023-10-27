"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <main>
      <code>{JSON.stringify(session)}</code>
      {!session.data ? (
        <button onClick={() => void signIn("google")}>click me</button>
      ) : (
        <button onClick={() => void signOut()}>click me</button>
      )}
    </main>
  );
}
