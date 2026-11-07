import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — Hireloop",
  description:
    "Sign in to your Hireloop account to browse jobs, track applications, and connect with top companies.",
};

export default function SignInPage() {
  return <SignInForm />;
}
