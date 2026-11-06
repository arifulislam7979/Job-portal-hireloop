"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

const ctaClasses = cn(
  buttonVariants({ variant: "ghost", size: "lg" }),
  "h-10 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] hover:from-indigo-400 hover:to-violet-500 hover:text-white",
);

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1F1F1F] px-3 py-3 sm:px-5 sm:py-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 w-full max-w-330 items-center justify-between gap-4 rounded-2xl border border-white/6 bg-[#141414] px-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] sm:h-16 sm:px-6"
      >
        <Link
          href="/"
          aria-label="Hireloop home"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
        >
          <Image
            src="/images/logo.png"
            alt="Hireloop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto select-none sm:h-11"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  isActive(link.href) ? "text-white" : "text-zinc-400",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Separator
            orientation="vertical"
            className="h-6 bg-white/15 self-center my-auto"
          />

          <Link
            href="/sign-in"
            className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign In
          </Link>

          <Link href="/sign-up" className={ctaClasses}>
            Get Started
          </Link>
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger
            aria-label="Open navigation menu"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 lg:hidden"
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-75 border-white/10 bg-[#141414] text-zinc-100 sm:max-w-[320px]"
          >
            <SheetHeader className="border-b border-white/10 px-5 py-5">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse links and account actions for Hireloop.
              </SheetDescription>
              <Link
                href="/"
                aria-label="Hireloop home"
                className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <Image
                  src="/images/logo.png"
                  alt="Hireloop"
                  width={154}
                  height={44}
                  priority
                  className="h-9 w-auto select-none sm:h-11"
                />
              </Link>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-3 py-4"
            >
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    />
                  }
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white",
                    isActive(link.href)
                      ? "bg-white/5 text-white"
                      : "text-zinc-400",
                  )}
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="mt-auto gap-3 border-t border-white/10 p-4">
              <SheetClose
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="inline-flex h-10 items-center justify-center rounded-xl text-sm font-medium text-indigo-400 transition-colors hover:bg-white/5 hover:text-indigo-300"
              >
                Sign In
              </SheetClose>

              <SheetClose
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className={cn(ctaClasses, "w-full")}
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
