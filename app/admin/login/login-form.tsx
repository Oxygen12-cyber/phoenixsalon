"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

const initial: LoginState = {};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black transition-colors placeholder:text-[#9B938E] focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10";

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-black">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-black">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
