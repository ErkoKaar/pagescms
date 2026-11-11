"use client";

import type { FormEvent } from "react";
import { Loader } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OtpVerificationFormProps = {
  busy: boolean;
  emailLabel: string;
  otp: string;
  pending: boolean;
  resendDisabled?: boolean;
  resendPending?: boolean;
  submitLabel?: string;
  onChange: (value: string) => void;
  onResend: () => void;
  onSignInAnotherWay?: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function OtpVerificationForm({
  busy,
  emailLabel,
  otp,
  pending,
  resendDisabled,
  resendPending,
  submitLabel = "Logi sisse",
  onChange,
  onResend,
  onSignInAnotherWay,
  onSubmit,
}: OtpVerificationFormProps) {
  return (
    <form className="flex w-full flex-col gap-8" onSubmit={onSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Vaata oma postkasti
        </h1>
        <p className="text-muted-foreground">
          Saatsime 6-kohalise koodi aadressile <span className="font-medium text-foreground">{emailLabel}</span>. Kood kehtib 5 minutit.
        </p>
      </div>

      <InputOTP
        autoFocus
        disabled={pending}
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={otp}
        onChange={onChange}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot
              className="size-12 bg-popover font-mono text-xl sm:size-14"
              index={index}
              key={index}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="w-full space-y-2">
        <Button className="h-12 w-full text-base" size="lg" disabled={busy || otp.length !== 6} type="submit">
          {submitLabel}
          {pending && <Loader className="size-4 animate-spin" />}
        </Button>
        <Button
          className="w-full"
          disabled={busy || resendDisabled}
          onClick={onResend}
          type="button"
          variant="ghost"
        >
          Saada kood uuesti
          {resendPending && <Loader className="size-4 animate-spin" />}
        </Button>
        {onSignInAnotherWay && (
          <Button
            className="w-full"
            disabled={busy}
            onClick={onSignInAnotherWay}
            type="button"
            variant="ghost"
          >
            Kasuta teist e-posti
          </Button>
        )}
      </div>
    </form>
  );
}
