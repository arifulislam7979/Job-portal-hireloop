"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      setError(null);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!trimmedEmail || !formData.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await signIn.email({
        email: trimmedEmail,
        password: formData.password,
        rememberMe,
      });
      if (data) {
      toast.success("Sign In Successfully");
      router.push('/');
    }

      if (signInError) {
        const message = signInError.message ?? "";
        setError(
          message.toLowerCase().includes("invalid")
            ? "That email or password doesn't look right. Please try again."
            : message || "We couldn't sign you in. Please try again.",
        );
        return;
      }

      router.replace("/");
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#9f9aff] uppercase">
          Welcome back
        </p>
        <h1 className="mt-3 font-heading text-[28px] leading-tight font-bold tracking-[-0.025em] text-white sm:text-[34px]">
          Sign in to Hireloop
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Pick up where you left off and keep moving toward your next role.
        </p>
      </div>

      {!error ? null : (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-300" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-gray-300 block mb-1.5">
            Email address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 size-4 text-white/40" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              autoComplete="email"
              className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-xs font-medium text-gray-300">
              Password
            </label>
            <a
              href="mailto:support@hireloop.com?subject=Hireloop%20password%20reset"
              className="text-xs font-medium text-[#a9a4ff] transition-colors hover:text-white"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 size-4 text-white/40" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full bg-[#121214] border-white/10 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-white/40 hover:text-white focus:outline-none"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <label
          htmlFor="remember-me"
          className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-white/55 select-none pt-1"
        >
          <span className="relative flex size-4 items-center justify-center rounded-[5px] border border-white/20 bg-white/3 transition-colors has-checked:border-[#5C53FE] has-checked:bg-[#5C53FE] has-focus-visible:ring-2 has-focus-visible:ring-[#5C53FE]/50">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="peer sr-only"
            />
            <Check className="size-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </span>
          Remember me for 30 days
        </label>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#5C53FE] text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(92,83,254,0.95)] transition-colors hover:bg-[#6c64ff] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Redirect to Sign Up */}
      <div className="mt-7">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase">
            New to Hireloop?
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Link
          href="/sign-up"
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40"
        >
          Create an account
          <ArrowUpRight className="size-4 text-white/50" />
        </Link>
      </div>

      <p className="mt-8 text-center text-xs leading-5 text-white/35">
        Need help?{" "}
        <a
          href="mailto:support@hireloop.com"
          className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Contact support
        </a>
      </p>
    </div>
  );
}