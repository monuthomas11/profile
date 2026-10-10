import { about } from "@/content/about";

import { Reveal } from "@/components/motion/Reveal";
import { EntryHeader } from "@/components/ui/EntryHeader";

export function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <EntryHeader title="About" meta="since 2014" />
          <div className="mt-8 max-w-[68ch] space-y-6 text-lg leading-8 text-muted-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
