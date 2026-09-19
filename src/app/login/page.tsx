"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(
        error.message.toLowerCase().includes("signups not allowed")
          ? "That email isn't on the list. Ask for an invite first."
          : error.message,
      );
      return;
    }

    setStatus("sent");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold">WatchList</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Sign in with your email to see our list.
        </p>

        {status === "sent" ? (
          <p className="mt-8 rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-900">
            Check <span className="font-medium">{email}</span> for a sign-in
            link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-neutral-300 px-4 py-3 text-base outline-none focus:border-neutral-500 dark:border-neutral-700"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-neutral-900 px-4 py-3 text-base font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
            >
              {status === "sending" ? "Sending…" : "Send sign-in link"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
