"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#010102] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0a0a0c]/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">
            Please sign in to your HireLoop account.
          </p>
        </div>

        {/* Form Fields (No Functionality) */}
        <div className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 size-4 text-gray-500" />
              <Input
                type="email"
                placeholder="arif@example.com"
                className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-gray-600 focus-visible:ring-[#635BFF]"
              />
            </div>
          </div>

          {/* Password Field with Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#635BFF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 size-4 text-gray-500" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-[#121214] border-white/10 pl-10 pr-10 text-white placeholder:text-gray-600 focus-visible:ring-[#635BFF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#635BFF] hover:bg-[#5248FF] text-white font-semibold py-5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span>Sign In</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Footer link to sign up */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#635BFF] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
