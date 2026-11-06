import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const;

const STATS = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: Building2 },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010102]">
      {/* Globe + starfield backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-30 bottom-0 -z-10 sm:-top-24"
      >
        <Image
          src="/images/globe.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,1,2,0.18)_0%,rgba(1,1,2,0)_30%,rgba(1,1,2,0)_52%,rgba(1,1,2,0.5)_84%,#010102_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-360 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-15 lg:pb-20">
        {/* Hero copy + search */}
        <div className="mx-auto flex max-w-196 flex-col items-center pt-32 text-center sm:pt-40 lg:pt-44">
          <div className="flex items-center justify-center">
            <span
              aria-hidden="true"
              className="hidden h-px w-16 bg-linear-to-r from-transparent to-white/60 sm:block"
            />
            <div className="rounded-full bg-[linear-gradient(100deg,#474747_0%,#111113_52%,#010102_100%)] p-px shadow-[inset_0_0_6px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-center rounded-full bg-[linear-gradient(100deg,#2a2a2b_0%,#0a0a0c_52%,#010102_100%)] px-5 py-3 sm:px-6">
                <span className="font-mono text-[13px] leading-none whitespace-nowrap text-white sm:text-[15px] lg:text-[18px]">
                  50,000+ new jobs this month
                </span>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="hidden h-px w-16 bg-linear-to-l from-transparent to-white/60 sm:block"
            />
          </div>

          <h1 className="mt-8 font-heading text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-white">
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 max-w-196 text-base leading-[1.6] text-white/70 sm:text-lg lg:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>

          <form
            action="/jobs"
            method="get"
            className="mt-8 w-full max-w-196 text-left sm:mt-10 lg:mt-12"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] sm:flex-row sm:items-center sm:gap-0 sm:pl-4">
              <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 focus-within:bg-white/4">
                <Search className="size-5 shrink-0 text-white/60" />
                <span className="sr-only">Job title, skill or company</span>
                <input
                  type="search"
                  name="q"
                  placeholder="Job title, skill or company"
                  autoComplete="off"
                  className="h-full w-full min-w-0 bg-transparent text-[15px] text-white outline-none placeholder:text-white/50"
                />
              </label>

              <span
                aria-hidden="true"
                className="h-px w-full bg-white/10 sm:h-6 sm:w-px"
              />

              <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 focus-within:bg-white/4">
                <MapPin className="size-5 shrink-0 text-white/60" />
                <span className="sr-only">Location or Remote</span>
                <input
                  type="text"
                  name="location"
                  placeholder="Location or Remote"
                  autoComplete="off"
                  className="h-full w-full min-w-0 bg-transparent text-[15px] text-white outline-none placeholder:text-white/50"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5C53FE] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#6c64ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Search className="size-4" />
                Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="text-sm text-white/70 sm:text-base">
              Trending Position
            </span>
            {TRENDING_POSITIONS.map((position) => (
              <Link
                key={position}
                href={`/jobs?q=${encodeURIComponent(position)}`}
                className="rounded-full border border-white/10 bg-[#1A1A1B] px-4 py-1.5 text-[13px] text-white transition-colors hover:border-white/25 hover:bg-white/10 sm:text-sm"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-28 sm:mt-44 lg:mt-90">
          <h2 className="mx-auto max-w-150 text-center font-heading text-[28px] leading-[1.3] font-medium tracking-tight text-white/70 sm:text-[34px] lg:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={cn(
                    "flex min-h-55 flex-col justify-between rounded-2xl border border-white/10 p-6 sm:min-h-63.5",
                    "bg-[linear-gradient(135deg,#010102_0%,#313131_100%)]",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                  )}
                >
                  <Icon className="size-6 text-white/70" aria-hidden="true" />
                  <div>
                    <p className="font-(family-name:--font-jakarta) text-[48px] leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[56px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-base text-white sm:text-lg">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
