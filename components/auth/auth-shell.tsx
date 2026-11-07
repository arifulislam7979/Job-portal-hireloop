import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: BriefcaseBusiness,
    text: "Curated roles at world-class companies",
  },
  {
    icon: Sparkles,
    text: "Personalized matches that fit your goals",
  },
  {
    icon: ShieldCheck,
    text: "A private, secure, spam-free experience",
  },
] as const;

const STATS = [
  { value: "50K+", label: "Active jobs" },
  { value: "12K", label: "Companies" },
  { value: "97%", label: "Satisfaction" },
] as const;

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#010102] px-4 py-8 sm:px-6 sm:py-12">
      {/* Ambient page glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-48 left-1/2 h-105 w-205 -translate-x-1/2 rounded-full bg-[#5C53FE]/15 blur-[140px]" />
        <div className="absolute -right-32 bottom-[-18%] h-90 w-90 rounded-full bg-[#b5179e]/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-280">
        {/* Compact header for small screens */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <Link
            href="/"
            aria-label="Hireloop home"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60"
          >
            <Image
              src="/images/logo.png"
              alt="Hireloop"
              width={154}
              height={44}
              priority
              className="h-9 w-auto select-none"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-[26px] border border-white/10 bg-[#08080B]/85 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:grid-cols-2">
          {/* Brand panel */}
          <aside className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col">
            <div aria-hidden="true" className="absolute inset-0">
              <Image
                src="/images/globe.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 0px"
                className="object-cover object-[50%_78%] opacity-50"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,9,0.94)_0%,rgba(6,6,9,0.6)_42%,rgba(6,6,9,0.82)_100%)]" />
              <div className="absolute -bottom-40 left-1/2 h-80 w-[125%] -translate-x-1/2 rounded-full bg-[#5C53FE]/25 blur-[120px]" />
            </div>

            <div className="relative flex flex-1 flex-col p-10 xl:p-12">
              <Link
                href="/"
                aria-label="Hireloop home"
                className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60"
              >
                <Image
                  src="/images/logo.png"
                  alt="Hireloop"
                  width={154}
                  height={44}
                  priority
                  className="h-10 w-auto select-none"
                />
              </Link>

              <div className="mt-20 xl:mt-24">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                  <Sparkles className="size-3.5 text-[#9f9aff]" />
                  Built for ambitious people
                </span>

                <h2 className="mt-5 max-w-100 font-heading text-[34px] leading-[1.14] font-bold tracking-tight text-white xl:text-[38px]">
                  Where ambition meets opportunity.
                </h2>

                <p className="mt-4 max-w-90 text-sm leading-6 text-white/60">
                  Join a community of professionals and teams building careers
                  worth being proud of.
                </p>

                <ul className="mt-8 space-y-4">
                  {HIGHLIGHTS.map((highlight) => {
                    const Icon = highlight.icon;

                    return (
                      <li
                        key={highlight.text}
                        className="flex items-start gap-3 text-sm text-white/70"
                      >
                        <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full border border-[#5C53FE]/40 bg-[#5C53FE]/15">
                          <Icon className="size-3 text-[#a9a4ff]" />
                        </span>
                        {highlight.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-xl font-bold tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.14em] text-white/40 uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 flex items-center gap-2 text-[11px] text-white/35">
                <Check className="size-3.5 text-emerald-400/80" />
                Trusted by 15,000+ professionals worldwide
              </p>
            </div>
          </aside>

          {/* Form panel */}
          <div className="relative flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
