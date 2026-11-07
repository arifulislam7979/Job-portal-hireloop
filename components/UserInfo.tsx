"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  Loader2,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  emailVerified?: boolean | null;
  createdAt?: Date | string | null;
}

interface UserInfoProps {
  user?: User | null;
}

type RoleMeta = {
  label: string;
  icon: LucideIcon;
  className: string;
};

const ROLE_META: Record<string, RoleMeta> = {
  seeker: {
    label: "Job seeker",
    icon: UserRound,
    className:
      "border-[#5C53FE]/30 bg-[#5C53FE]/15 text-[#c3bfff]",
  },
  recruiter: {
    label: "Recruiter",
    icon: Building2,
    className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  },
  admin: {
    label: "Administrator",
    icon: ShieldCheck,
    className: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  },
};

function getDisplayName(user: User) {
  const name = user.name?.trim();
  if (name) {
    return name;
  }

  const email = user.email?.trim();
  if (email) {
    return email.split("@")[0];
  }

  return "Hireloop member";
}

function getInitials(name: string, email?: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "";

  const initials = source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || "U";
}

function formatMemberSince(value?: Date | string | null) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function UserInfo({ user }: UserInfoProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(
          error.message || "We couldn't sign you out. Please try again.",
        );
        setLoading(false);
        return;
      }

      toast.success("Signed out successfully");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error(
        "We couldn't sign you out. Check your connection and try again.",
      );
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/50"
      >
        Sign in
      </Link>
    );
  }

  const displayName = getDisplayName(user);
  const displayEmail = user.email?.trim() || "No email on file";
  const initials = getInitials(displayName, user.email);
  const role = ROLE_META[user.role ?? "seeker"] ?? ROLE_META.seeker;
  const RoleIcon = role.icon;
  const firstName = displayName.split(/\s+/)[0];
  const isVerified = Boolean(user.emailVerified);
  const memberSince = formatMemberSince(user.createdAt);

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        aria-label={`Open account menu for ${displayName}`}
        className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-2.5 pl-1 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/50 data-[popup-open]:border-[#5C53FE]/40 data-[popup-open]:bg-white/[0.07]"
      >
        <Avatar className="size-9 bg-[#15151a]">
          <AvatarImage src={user.image ?? undefined} alt="" />
          <AvatarFallback className="bg-[#5C53FE]/20 text-xs font-semibold text-[#c3bfff]">
            {initials}
          </AvatarFallback>
        </Avatar>

        <span className="hidden max-w-28 truncate text-sm font-medium text-white/85 md:block">
          {firstName}
        </span>

        <ChevronDown className="size-3.5 text-white/40 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[min(92vw,20rem)] gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e]/95 p-0 text-white shadow-[0_28px_80px_-24px_rgba(0,0,0,0.95)] ring-0 backdrop-blur-xl"
      >
        <div aria-hidden="true" className="relative h-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(130%_150%_at_12%_0%,rgba(92,83,254,0.55),rgba(92,83,254,0.08)_45%,transparent_75%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="px-5 pb-4">
          <div className="-mt-8 flex items-end justify-between gap-3">
            <Avatar className="size-16 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] ring-4 ring-[#0b0b0e]">
              <AvatarImage src={user.image ?? undefined} alt="" />
              <AvatarFallback className="bg-[#5C53FE]/20 text-lg font-semibold text-[#c3bfff]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <span
              className={cn(
                "mb-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase",
                role.className,
              )}
            >
              <RoleIcon className="size-3" />
              {role.label}
            </span>
          </div>

          <PopoverTitle className="mt-3 truncate font-heading text-lg font-bold tracking-tight text-white">
            {displayName}
          </PopoverTitle>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{displayEmail}</span>
          </p>

          <dl className="mt-4 divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <dt className="flex items-center gap-2 text-xs text-white/45">
                <ShieldCheck className="size-3.5" />
                Email status
              </dt>
              <dd
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] font-medium",
                  isVerified ? "text-emerald-400" : "text-amber-400",
                )}
              >
                {isVerified ? (
                  <BadgeCheck className="size-3.5" />
                ) : (
                  <AlertCircle className="size-3.5" />
                )}
                {isVerified ? "Verified" : "Unverified"}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <dt className="flex items-center gap-2 text-xs text-white/45">
                <CalendarDays className="size-3.5" />
                Member since
              </dt>
              <dd className="text-[11px] font-medium text-white/70">
                {memberSince}
              </dd>
            </div>
          </dl>

          <Separator className="my-4 bg-white/[0.08]" />

          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.06] text-sm font-medium text-red-300 transition-colors hover:border-red-500/25 hover:bg-red-500/[0.12] hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing out…
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                Sign out
              </>
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
