"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  const lIn = () => {
    void signIn("google");
  };

  const lOut = () => {
    void signOut();
  };

  return (
    <main>
      <div>
        {session.data?.user && (
          <Avatar>
            <AvatarImage src={session.data.user.image ?? undefined} />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div>
        <code>{JSON.stringify(session)}</code>
      </div>
      {!session.data ? (
        <Button onClick={lIn}>log in</Button>
      ) : (
        <Button variant="secondary" onClick={lOut}>
          log out
        </Button>
      )}
    </main>
  );
}
