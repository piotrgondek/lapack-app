"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  const lIn = () => {
    void signIn("google");
  };

  const lOut = () => {
    void signOut();
  };

  useEffect(() => {
    void fetch("/api/permissions/group")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="pt-2 p-4">
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
