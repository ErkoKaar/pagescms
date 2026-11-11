"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type EntrySection = { id: string; label: string };

// Smaller than this and the rail is not worth it.
const MIN_SECTIONS = 3;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const EntrySectionNav = ({ sections }: { sections: EntrySection[] }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  // Active section = first one touching the band between the sticky header and ~40% of the viewport.
  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        const next = atBottom
          ? sections[sections.length - 1]?.id
          : sections.find((section) => visible.has(section.id))?.id;
        if (next) setActiveId(next);
      },
      { rootMargin: "-72px 0px -60% 0px" },
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Sel lehel"
      className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-sm"
    >
      <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Sel lehel
      </p>
      <ul className="grid gap-0.5">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => handleClick(event, section.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block rounded-full px-3 py-1.5 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isActive
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { EntrySectionNav, MIN_SECTIONS };
export type { EntrySection };
