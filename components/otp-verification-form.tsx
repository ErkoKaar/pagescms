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
  submitLabel = "Sign in",
  onChange,
  onResend,
  onSignInAnotherWay,
  onSubmit,
}: OtpVerificationFormProps) {
  return (
    <form className="flex w-full flex-col gap-8" onSubmit={onSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Check your email
        </h1>
        <p className="text-muted-foreground">
          We sent a 6-digit code to <span className="font-medium text-foreground">{emailLabel}</span>. It is valid for 5 minutes.
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
          Resend code
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
            Use a different email
          </Button>
        )}
      </div>
    </form>
  );
}
