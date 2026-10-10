"use client";

import Link from "next/link";
import { Fragment } from "react";
import { Printer } from "lucide-react";

import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export default function ResumePage() {
  const profileLinks = site.socialLinks.filter((item) => item.icon !== "mail");

  return (
    <div className="mx-auto w-full max-w-3xl bg-white px-5 py-12 text-black print:max-w-none print:bg-white print:text-black sm:px-8 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/" className="text-sm font-medium text-slate-700 underline-offset-4 transition hover:underline">
          ← Back to home
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-black"
        >
          <Printer size={16} /> Print / Save as PDF
        </button>
      </div>

      <header className="border-b border-slate-300 pb-6">
        <h1 className="text-4xl font-black tracking-[-0.04em]">{site.name}</h1>
        <p className="mt-2 text-lg text-slate-700">{site.headline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-700">
          <a href={`mailto:${site.email}`} className="underline-offset-4 transition hover:underline print:no-underline">{site.email}</a>
          <span aria-hidden="true">•</span>
          <span>{site.location}</span>
          {profileLinks.map((item) => (
            <Fragment key={item.label}>
              <span aria-hidden="true">•</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition hover:underline print:no-underline"
              >
                {item.label}
              </a>
            </Fragment>
          ))}
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-bold uppercase tracking-[0.18em] text-slate-700">Experience</h2>
        <div className="mt-5 space-y-8">
          {experience.map((job) => (
            <div key={`${job.company}-${job.start}`} className="print:break-inside-avoid">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{job.role}</h3>
                  <p className="text-sm text-slate-700">{job.company}</p>
                </div>
                <p className="text-sm text-slate-700">{job.start} – {job.end ?? "Present"}</p>
              </div>
              <ul className="mt-3 max-w-[32rem] list-disc space-y-2 pl-5 text-sm leading-6 text-slate-800">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold uppercase tracking-[0.18em] text-slate-700">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.flatMap((group) => group.items).map((item) => (
            <span key={item} className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 print:break-inside-avoid">
        <h2 className="text-xl font-bold uppercase tracking-[0.18em] text-slate-700">Education</h2>
        <div className="mt-4 space-y-4">
          {education.degrees.map((item) => (
            <div key={`${item.degree}-${item.institution}`}>
              <p className="text-base font-bold">{item.degree}</p>
              <p className="text-sm text-slate-700">{item.institution} • {item.start} – {item.end ?? "Present"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 print:break-inside-avoid">
        <h2 className="text-xl font-bold uppercase tracking-[0.18em] text-slate-700">Certifications</h2>
        <div className="mt-4 space-y-4">
          {education.certifications.map((item) => (
            <div key={`${item.degree}-${item.institution}`}>
              <p className="text-base font-bold">{item.degree}</p>
              <p className="text-sm text-slate-700">{item.institution}</p>
              {item.notes ? <p className="text-sm text-slate-700">{item.notes}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
