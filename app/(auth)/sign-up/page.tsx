import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create an account — Hireloop",
  description:
    "Create your Hireloop account as a job seeker or recruiter and start finding better opportunities today.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
