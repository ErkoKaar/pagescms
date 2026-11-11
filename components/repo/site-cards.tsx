"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteHref, useSites } from "@/hooks/use-sites";
import { getSite } from "@/lib/sites";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SiteCards() {
  const repos = useSites();

  if (repos === null) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className="aspect-[4/5] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <p className="text-muted-foreground">
        Selle kontoga pole veel ühtegi lehte jagatud.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {repos.map((repo) => {
        const site = getSite(repo.repo);
        const href = siteHref(repo);

        return (
          <li
            key={`${repo.owner}/${repo.repo}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-shadow duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring"
          >
            {site && (
              <div className="aspect-[1200/630] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.image}
                  alt=""
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-6 p-5">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  <Link href={href} className="outline-none after:absolute after:inset-0">
                    {site?.name ?? repo.repo}
                  </Link>
                </h2>
                {site && <p className="text-sm text-muted-foreground">{site.about}</p>}
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <span className={cn(buttonVariants({ size: "lg" }), "pointer-events-none")}>
                  Muuda lehte
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
                {site && (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 inline-flex min-h-10 items-center gap-1 text-sm font-medium underline underline-offset-4 hover:no-underline"
                  >
                    Ava leht
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
