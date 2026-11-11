import { cn } from "@/lib/utils";

/* Karli nimi nagu lehe päises: suurtähed, hõre tiitrikiri. Punane punkt on lehe aktsent. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-[#e5323e]" />
      Karl Robert Saaremäe
    </span>
  );
}
