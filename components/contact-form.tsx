"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircleIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { waLink } from "@/lib/whatsapp";

interface Fields {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

const validate = (v: Fields): Errors => {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Enter a valid email address.";
  if (!v.message.trim()) e.message = "Please enter a message.";
  return e;
};

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-black transition-colors placeholder:text-[#9B938E] focus:outline-none focus:ring-2 focus:ring-black/10";

const ContactForm = () => {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    setErrors((e) => (e[key] ? { ...e, [key]: validate(next)[key] } : e));
  };

  const handleBlur = (key: keyof Fields) =>
    setErrors((e) => ({ ...e, [key]: validate(values)[key] }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    const message = `Hi Phoenix Salon, my name is ${values.name.trim()} (${values.email.trim()}). ${values.message.trim()}`;
    window.setTimeout(() => {
      window.open(waLink(message), "_blank", "noopener,noreferrer");
      setStatus("sent");
    }, 400);
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
      >
        <CheckCircleIcon size={40} weight="fill" className="text-green-600" />
        <div>
          <p className="text-lg font-bold text-black">Thanks, {values.name.trim() || "there"}!</p>
          <p className="mt-1 text-sm font-light text-[#6B6560]">
            WhatsApp should be opening with your message ready to send. If it
            didn&apos;t, message us on {""}
            <a
              href={waLink(`Hi Phoenix Salon, my name is ${values.name.trim()} (${values.email.trim()}). ${values.message.trim()}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black underline underline-offset-2"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setErrors({});
            setStatus("idle");
          }}
          className="text-sm font-semibold text-black underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (
    key: keyof Fields,
    label: string,
    type: string,
    autoComplete?: string,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={key} className="text-sm font-medium text-black">
        {label}
      </label>
      <input
        id={key}
        name={key}
        type={type}
        autoComplete={autoComplete}
        value={values[key]}
        onChange={(e) => set(key, e.target.value)}
        onBlur={() => handleBlur(key)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className={`${inputClass} ${
          errors[key] ? "border-red-500" : "border-black/10"
        }`}
      />
      {errors[key] && (
        <p id={`${key}-error`} role="alert" className="text-xs text-red-600">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
    >
      {field("name", "Name", "text", "name")}
      {field("email", "Email", "email", "email")}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-black">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-none ${
            errors.message ? "border-red-500" : "border-black/10"
          }`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={reduceMotion || status === "sending" ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion || status === "sending" ? undefined : { scale: 0.98 }}
        className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Opening WhatsApp…" : "Send message"}
        <PaperPlaneTiltIcon size={18} weight="bold" />
      </motion.button>

      <p className="text-xs font-light text-[#6B6560]">
        Sends straight to our WhatsApp — no account needed.
      </p>
    </form>
  );
};

export default ContactForm;
