import { cn } from "@/lib/utils";

/* Grupi logo: basalt heledal, kivihall tumedal taustal. */
export function ThorLogo({ className }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/thor/thor-group-basalt.svg"
        alt="Thor Group"
        width={824}
        height={276}
        className={cn("w-auto dark:hidden", className)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/thor/thor-group-stone.svg"
        alt="Thor Group"
        width={824}
        height={276}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  );
}
