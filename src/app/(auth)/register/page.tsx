"use client"

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Register from "modules/Auth/Register";

const RegisterPage = () => {
  const { data: session } = useSession();

  return (
    <Register />
  );
};

export default RegisterPage;
