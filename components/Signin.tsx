"use client";
import { signIn } from "next-auth/react";

function SignIn() {
  return <button onClick={() => signIn()}>Sign In</button>;
}

export default SignIn;