/* Thori lehed: repo nimi → kliendile arusaadav nimi ja live-aadress.
   Aadressid on ajutised Verceli aliased, vaheta kui .fo domeenid on suunatud. */
type ThorSite = {
  name: string;
  about: string;
  url: string;
};

const sites: Record<string, ThorSite> = {
  thoroffshore: {
    name: "Thor Offshore",
    about: "Support vessels, services and crew pages",
    url: "https://thor-orpin.vercel.app",
  },
  thorfisheries: {
    name: "Thor Fisheries",
    about: "Fleet, catch and company pages",
    url: "https://thorfisheries.vercel.app",
  },
  ocjoensen: {
    name: "O.C. Joensen",
    about: "Products, recipes and certificates",
    url: "https://oc-joensen.vercel.app",
  },
};

const getThorSite = (repo: string): ThorSite | undefined =>
  sites[repo.toLowerCase()];

const getSiteName = (repo: string) => getThorSite(repo)?.name ?? repo;

export { getThorSite, getSiteName };
export type { ThorSite };
