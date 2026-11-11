"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Rendered inside <form id="entry-form">, so the submit button uses the same submit path as the header Save.
// Sticky inside the form: sits in the normal flow at the end, so it never covers the last field.
const EntrySaveBar = ({
  disabled,
  isSaving,
  onDiscard,
}: {
  disabled: boolean;
  isSaving: boolean;
  onDiscard: () => void;
}) => (
  <div
    role="region"
    aria-label="Salvestamata muudatused"
    className="sticky bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border bg-popover p-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
  >
    <p className="w-full text-sm font-medium sm:w-auto sm:flex-1 sm:pl-2">
      Salvestamata muudatused
    </p>
    <div className="flex w-full items-center gap-2 sm:w-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="ghost" size="lg" disabled={isSaving}>
            Loobu
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Loobud muudatustest?</AlertDialogTitle>
            <AlertDialogDescription>
              Kõik, mida sel lehel pärast viimast salvestamist muutsid, võetakse tagasi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Jätka muutmist</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDiscard}>
              Loobu muudatustest
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        type="submit"
        size="lg"
        disabled={disabled}
        className="flex-1 sm:flex-none"
      >
        {isSaving ? "Salvestan…" : "Salvesta"}
      </Button>
    </div>
  </div>
);

export { EntrySaveBar };
