"use client";

import React, { useActionState } from "react";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-margin-mobile">
      <div className="w-full max-w-md p-8 bg-white border border-outline-variant/20 rounded-2xl shadow-sm">
        <div className="mb-8 text-center">
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-2 block">
            Obsidian &amp; Ether
          </span>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">
            Admin Portal
          </h1>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md focus:outline-none focus:border-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-error-container text-on-error-container border border-error/20 rounded-lg text-body-md">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-primary text-on-primary rounded-lg font-semibold hover:bg-on-surface-variant transition-all active:scale-95 duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
