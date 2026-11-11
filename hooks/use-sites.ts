"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/contexts/user-context";
import { requireApiSuccess } from "@/lib/api-client";

type SiteRepo = {
  owner: string;
  repo: string;
  defaultBranch?: string;
};

/* Kõik lehed, millele kasutajal on ligipääs. null = laeb. Tulemus jääb sessiooniks meelde,
   et lehevahetaja ei laeks iga avamisega uuesti. */
let cached: { key: string; repos: SiteRepo[] } | null = null;

const siteHref = (site: SiteRepo) =>
  `/${site.owner}/${site.repo}/${encodeURIComponent(site.defaultBranch ?? "main")}`;

function useSites() {
  const { user } = useUser();
  const accounts = user?.accounts;
  const key = (accounts ?? []).map((account: any) => account.login).join(",");
  const [repos, setRepos] = useState<SiteRepo[] | null>(
    cached?.key === key ? cached.repos : null,
  );

  useEffect(() => {
    if (cached?.key === key) {
      setRepos(cached.repos);
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      const lists = await Promise.all(
        (accounts ?? []).map(async (account: any) => {
          const params = new URLSearchParams({
            type: account.type,
            keyword: "",
            repository_selection: account.repositorySelection,
          });
          const response = await fetch(
            `/api/repos/${account.login}?${params.toString()}`,
            { signal: controller.signal },
          );
          const data = await requireApiSuccess<{ data: SiteRepo[] }>(
            response,
            "Failed to fetch websites",
          );
          return data.data;
        }),
      );
      cached = { key, repos: lists.flat() };
      setRepos(cached.repos);
    };

    load().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
        setRepos([]);
      }
    });

    return () => controller.abort();
  }, [accounts, key]);

  return repos;
}

export { useSites, siteHref };
export type { SiteRepo };
