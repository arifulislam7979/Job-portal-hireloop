"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
        console.log('password failed');
    }

    const {data} = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: '/'
    })
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#010102] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0a0a0c]/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Create an Account
          </h1>
          <p className="text-sm text-gray-400">
            Join HireLoop to find your dream job or top talent.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 size-4 text-gray-500" />
              <Input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-gray-600 focus-visible:ring-[#635BFF]"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 size-4 text-gray-500" />
              <Input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="arif@example.com"
                className="w-full bg-[#121214] border-white/10 pl-10 text-white placeholder:text-gray-600 focus-visible:ring-[#635BFF]"
              />
            </div>
          </div>

          {/* Password Field with Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 size-4 text-gray-500" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password Field with Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 size-4 text-gray-500" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#121214] border-white/10 pl-10 pr-10 text-white placeholder:text-gray-600 focus-visible:ring-[#635BFF]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-gray-400 hover:text-white focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#635BFF] hover:bg-[#5248FF] text-white font-semibold py-5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Sign Up</span>
            <ArrowRight className="size-4" />
          </Button>
        </form>

        {/* Footer link to login */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[#635BFF] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;