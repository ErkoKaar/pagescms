"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { requireApiSuccess } from "@/lib/api-client";
import { getThorSite } from "@/lib/thor-sites";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Repo = {
  owner: string;
  repo: string;
  defaultBranch?: string;
};

export function SiteCards() {
  const { user } = useUser();
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      const lists = await Promise.all(
        (user?.accounts ?? []).map(async (account: any) => {
          const params = new URLSearchParams({
            type: account.type,
            keyword: "",
            repository_selection: account.repositorySelection,
          });
          const response = await fetch(
            `/api/repos/${account.login}?${params.toString()}`,
            { signal: controller.signal },
          );
          const data = await requireApiSuccess<{ data: Repo[] }>(
            response,
            "Failed to fetch websites",
          );
          return data.data;
        }),
      );
      setRepos(lists.flat());
    };

    load().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
        setRepos([]);
      }
    });

    return () => controller.abort();
  }, [user?.accounts]);

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
        No websites have been shared with this account yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {repos.map((repo) => {
        const site = getThorSite(repo.repo);
        const href = `/${repo.owner}/${repo.repo}/${encodeURIComponent(repo.defaultBranch ?? "main")}`;

        return (
          <li
            key={`${repo.owner}/${repo.repo}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-shadow duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring"
          >
            {site && (
              <div className="aspect-[1200/630] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${site.url}/og.jpg`}
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
                  Edit website
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
                {site && (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 inline-flex min-h-10 items-center gap-1 text-sm font-medium underline underline-offset-4 hover:no-underline"
                  >
                    View live
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
