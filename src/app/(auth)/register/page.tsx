import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RegisterPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <h1>Login</h1>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      ) : (
        <>
          <h1>Welcome, {session.user?.name}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
