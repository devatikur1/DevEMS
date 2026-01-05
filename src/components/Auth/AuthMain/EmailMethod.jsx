import React, { useState } from "react";
import { ArrowLeft, KeyRound, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailMethod({
  IsSignIn,
  setAuthError,
  providerSign,
  setSearchParams,
}) {
  const [lodingitem, setLodingItem, signIn] = providerSign;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLodingItem("email_auth");

    // Simulate auth or call actual provider
    // Since signIn logic in LoginProviders handled this, we need to adapt it here.
    // Assuming signIn takes (provider, isSignIn, email, password) or similar.
    // Based on usage in LoginProviders: signIn(id, IsSignIn)
    // Email usually requires extra args. I'll stick to the UI structure requested.
    // For now, let's assume specific email logic would be here or standardized.

    // Placeholder login delay
    await new Promise((r) => setTimeout(r, 1500));
    setLodingItem(null);
    setAuthError({
      status: true,
      text: "Backend integration pending for Email Auth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setSearchParams({})}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h3 className="text-lg font-medium text-white">
          {IsSignIn ? "Sign In" : "Sign Up"} with Email
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail
              className="absolute left-4 top-3 text-zinc-500 group-focus-within:text-blue-400 transition-colors"
              size={18}
            />
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 ml-1">
            Password
          </label>
          <div className="relative group">
            <KeyRound
              className="absolute left-4 top-3 text-zinc-500 group-focus-within:text-blue-400 transition-colors"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 rounded-xl py-2.5 pl-12 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {IsSignIn && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={lodingitem === "email_auth"}
          className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 rounded-xl shadow-lg ring-1 ring-white/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {lodingitem === "email_auth" ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            <span>{IsSignIn ? "Sign In" : "Create Account"}</span>
          )}
        </button>
      </form>
    </motion.div>
  );
}
