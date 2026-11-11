/* Kliendi lehed: repo nimi → arusaadav nimi ja live-aadress. */
type Site = {
  name: string;
  about: string;
  url: string;
  /* Kaardi pilt (1200 × 630), lehe enda Open Graph pilt */
  image: string;
};

const sites: Record<string, Site> = {
  karlrobertsaaremae: {
    name: "Karl Robert Saaremäe",
    about: "Näitleja, õhtujuht ja diskor",
    url: "https://karlrobertsaaremae.com",
    image: "https://karlrobertsaaremae.com/opengraph-image.jpg",
  },
};

const getSite = (repo: string): Site | undefined => sites[repo.toLowerCase()];

const getSiteName = (repo: string) => getSite(repo)?.name ?? repo;

export { getSite, getSiteName };
export type { Site };
