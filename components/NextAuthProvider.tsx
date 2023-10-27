"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default (function NextAuthProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
} satisfies React.FC<SessionProviderProps>);
