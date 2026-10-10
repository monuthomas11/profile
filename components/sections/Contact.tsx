"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { site } from "@/content/site";

import { Reveal } from "@/components/motion/Reveal";
import { EntryHeader } from "@/components/ui/EntryHeader";

const defaultValues = { name: "", email: "", message: "" };

export function Contact() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleChange = (field: keyof typeof defaultValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!formValues.name.trim()) nextErrors.name = "Please tell me your name.";
    if (!formValues.email.trim()) nextErrors.email = "Email is required.";
    if (formValues.message.trim().length < 10) nextErrors.message = "Your message should contain at least 10 characters.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setSubmittedMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setSubmittedMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, honeypot: "" }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? "Something went wrong");
      }

      setStatus("success");
      setSubmittedMessage(payload.message ?? "Thanks — your message is on the way.");
      setFormValues(defaultValues);
    } catch (error) {
      setStatus("error");
      setSubmittedMessage(error instanceof Error ? error.message : "Something went wrong. Please email directly instead.");
    }
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal from="deep">
          {/* The page ends where every changelog ends: the unwritten entry. */}
          <EntryHeader mark="##" title="[Unreleased]" meta="open by design" tone="changed" />

          <p className="mt-8 max-w-[60ch] text-lg leading-8 text-muted-foreground">
            This is where the next entry gets written. Reach out directly, or leave a
            note below — either way it starts a conversation.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="group mt-8 flex items-baseline gap-2"
          >
            <span aria-hidden="true" className="diff-mark diff-mark--added shrink-0 text-base">
              +
            </span>
            <span className="font-display text-2xl font-semibold tracking-[-0.01em] break-all underline decoration-added decoration-2 underline-offset-8 transition-colors group-hover:text-accent sm:text-3xl">
              {site.email}
            </span>
          </a>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {site.socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.icon === "mail" ? undefined : "_blank"}
                rel={item.icon === "mail" ? undefined : "noreferrer"}
                className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-12 max-w-[36rem]" noValidate>
            <p className="border-t border-border pt-4 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              leave a note
            </p>

            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  Name
                </label>
                <input
                  id="name"
                  value={formValues.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-foreground transition-colors focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-danger"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name ? <p id="name-error" className="mt-2 text-sm text-danger">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-foreground transition-colors focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-danger"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? <p id="email-error" className="mt-2 text-sm text-danger">{errors.email}</p> : null}
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="message" className="block font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formValues.message}
                onChange={(event) => handleChange("message", event.target.value)}
                className="mt-2 w-full resize-y border-b border-border bg-transparent py-2.5 text-foreground transition-colors focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-danger"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message ? <p id="message-error" className="mt-2 text-sm text-danger">{errors.message}</p> : null}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-foreground px-5 py-3 font-mono text-xs tracking-[0.14em] text-background uppercase transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send message"}
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
            </div>

            <div aria-live="polite" className="mt-4 min-h-6 text-sm">
              {submittedMessage ? <p className={status === "error" ? "text-danger" : "text-success"}>{submittedMessage}</p> : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
