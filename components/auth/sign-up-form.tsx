"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type AccountRole = "seeker" | "recruiter" | "admin";

const ROLES = [
  {
    value: "seeker",
    title: "Job seeker",
    description: "Find your next role",
    icon: UserRound,
  },
  {
    value: "recruiter",
    title: "Recruiter",
    description: "Hire great talent",
    icon: Building2,
  },
  {
    value: "admin",
    title: "Admin",
    description: "Best Admin",
    icon: Building2,
  },
] as const satisfies ReadonlyArray<{
  value: AccountRole;
  title: string;
  description: string;
  icon: typeof UserRound;
}>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState<AccountRole>("seeker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (trimmedName.length < 4) {
      setError("Please enter your full name.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password: formData.password,
        role,
      });

      if (data) {
        toast.success("Sign Up Successfully");
        router.push("/");
      }

      if (signUpError) {
        const message = signUpError.message ?? "";
        setError(
          message.toLowerCase().includes("exist")
            ? "An account with this email already exists. Try signing in instead."
            : message || "We couldn't create your account. Please try again.",
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
    <div className="mx-auto w-full max-w-110">
      <div>
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#9f9aff] uppercase">
          Get started
        </p>
        <h1 className="mt-3 font-heading text-[28px] leading-tight font-bold tracking-tight text-white sm:text-[34px]">
          Create your account
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Join Hireloop and get closer to work that actually fits your life.
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
        <fieldset className="space-y-2.5">
          <legend className="text-sm font-medium text-white/80">
            I&apos;m joining as
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {ROLES.map((option) => {
              const Icon = option.icon;
              const active = role === option.value;

              return (
                <label
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer flex-col gap-2 rounded-xl border p-3.5 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-[#5C53FE]/50",
                    active
                      ? "border-[#5C53FE]/70 bg-[#5C53FE]/10"
                      : "border-white/10 bg-white/2 hover:border-white/20",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={active}
                    onChange={() => setRole(option.value)}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between">
                    <Icon
                      className={cn(
                        "size-5",
                        active ? "text-[#a9a4ff]" : "text-white/45",
                      )}
                    />
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border transition-colors",
                        active
                          ? "border-[#5C53FE] bg-[#5C53FE]"
                          : "border-white/20",
                      )}
                    >
                      {active ? (
                        <Check className="size-2.5 text-white" />
                      ) : null}
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">
                      {option.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-white/45">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-medium text-gray-300 mb-2 block"
          >
            Full Name
          </label>
          <div className="relative flex items-center">
            <UserRound className="absolute left-3 size-4 text-white/40" />
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-gray-300 mb-2 block"
          >
            Email Address
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
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-gray-300 mb-2 block"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 size-4 text-white/40" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              className="w-full bg-[#121214] border-white/10 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-white/40 hover:text-white focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-medium text-gray-300 mb-2 block"
          >
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 size-4 text-white/40" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              minLength={8}
              className="w-full bg-[#121214] border-white/10 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:ring-[#5C53FE]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-white/40 hover:text-white focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#5C53FE] text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(92,83,254,0.95)] transition-colors hover:bg-[#6c64ff] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase">
            Already a member?
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Link
          href="/sign-in"
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40"
        >
          Sign in instead
          <ArrowUpRight className="size-4 text-white/50" />
        </Link>
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
        <ShieldCheck className="size-3.5" />
        Your information is encrypted and never shared.
      </p>
    </div>
  );
}
