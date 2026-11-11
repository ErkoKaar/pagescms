"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { emailOtp, signIn } from "@/lib/auth-client";
import { getAuthCallbackURL, getSafeRedirect } from "@/lib/auth-redirect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpVerificationForm } from "@/components/otp-verification-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [submittingMethod, setSubmittingMethod] = useState<
    "github" | "email" | "otp" | null
  >(null);
  const isSubmitting = submittingMethod !== null;

  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "";
  const redirectParam = searchParams.get("redirect") || "";
  const safeRedirect = getSafeRedirect(redirectParam);
  const callbackURL = getAuthCallbackURL(safeRedirect);
  const errorCallbackURL =
    safeRedirect === "/"
      ? "/sign-in"
      : `/sign-in?redirect=${encodeURIComponent(safeRedirect)}`;

  const getErrorMessage = (value: string) => {
    if (value.toLowerCase() !== "unable_to_get_user_info") return value;
    return [
      "GitHub denied profile access. Re-authorize Thor CMS in GitHub Settings > Applications > Authorized GitHub Apps / Authorized OAuth Apps, then try again.",
      "https://github.com/settings/applications",
    ].join(" ");
  };

  useEffect(() => {
    if (error) toast.error(getErrorMessage(error), { duration: 12000 });
  }, [error]);

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) setEmail(email.trim().toLowerCase());
  }, [searchParams]);

  const handleGithubSignIn = async () => {
    setSubmittingMethod("github");
    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL,
        errorCallbackURL,
        disableRedirect: true,
      });
      if (result.error?.message) {
        toast.error(result.error.message);
        setSubmittingMethod(null);
        return;
      }

      if (result.data?.url) {
        window.location.assign(result.data.url);
        return;
      }

      setSubmittingMethod(null);
      toast.error("Could not start GitHub sign-in. Please try again.");
    } catch (error: any) {
      toast.error(error?.message || "Could not start GitHub sign-in.");
      setSubmittingMethod(null);
    }
  };

  const handleEmailSignIn = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error("Invalid email");
      return;
    }

    setSubmittingMethod("email");
    try {
      const result = await emailOtp.sendVerificationOtp({
        email: normalizedEmail,
        type: "sign-in",
      });

      if (result.error?.message) {
        toast.error(result.error.message);
        return;
      }

      setEmail(normalizedEmail);
      setOtp("");
      setStep("otp");
      toast.success("We sent you a sign-in code.", { duration: 8000 });
    } finally {
      setSubmittingMethod(null);
    }
  };

  const handleOtpSignIn = async () => {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit code.");
      return;
    }

    setSubmittingMethod("otp");
    try {
      const result = await signIn.emailOtp({
        email,
        otp,
      });

      if (result.error?.message) {
        toast.error(result.error.message);
        return;
      }

      window.location.assign(safeRedirect);
    } finally {
      setSubmittingMethod(null);
    }
  };

  const resetToFullSignIn = () => {
    setStep("email");
    setOtp("");
  };

  const sites = ["Thor Offshore", "Thor Fisheries", "O.C. Joensen"];

  return (
    <div className="grid min-h-svh max-lg:grid-rows-[auto_1fr] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside className="flex flex-col justify-between gap-10 bg-[#2E3338] px-6 py-6 text-[#E4E2DC] lg:px-12 lg:py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thor/thor-group-stone.svg"
          alt="Thor Group"
          width={824}
          height={276}
          className="h-10 w-auto self-start lg:h-14"
        />
        <div className="space-y-6 max-lg:hidden">
          <p className="font-display text-5xl leading-[0.95] font-semibold xl:text-6xl">
            Content
            <br />
            manager
          </p>
          <ul className="space-y-1 text-lg text-[#E4E2DC]/70">
            {sites.map((site) => (
              <li key={site}>{site}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-[#E4E2DC]/60 max-lg:hidden">
          Edit the texts and images of your websites. Changes go live in about
          a minute.
        </p>
      </aside>
      <main className="flex items-center justify-center px-6 py-10 lg:px-12">
        <div className="w-full sm:max-w-[380px]">
          {step === "otp" ? (
            <OtpVerificationForm
              busy={isSubmitting}
              emailLabel={email}
              otp={otp}
              pending={submittingMethod === "otp"}
              resendDisabled={submittingMethod === "otp"}
              resendPending={submittingMethod === "email"}
              onChange={setOtp}
              onResend={() => void handleEmailSignIn()}
              onSignInAnotherWay={resetToFullSignIn}
              onSubmit={async (event) => {
                event.preventDefault();
                await handleOtpSignIn();
              }}
            />
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Sign in</h1>
                <p className="text-muted-foreground">
                  Enter your email and we will send you a 6-digit code. No
                  password needed.
                </p>
              </div>
              <form
                className="space-y-3"
                onSubmit={async (event) => {
                  event.preventDefault();
                  await handleEmailSignIn();
                }}
              >
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Email</span>
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    autoFocus
                    placeholder="name@company.fo"
                    className="h-12 text-base md:text-base"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full text-base"
                  disabled={isSubmitting}
                >
                  Send me a code
                  {submittingMethod === "email" && (
                    <Loader className="size-4 animate-spin" />
                  )}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">
                Developer?{" "}
                <button
                  type="button"
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline disabled:opacity-50"
                  onClick={handleGithubSignIn}
                  disabled={isSubmitting}
                >
                  Sign in with GitHub
                </button>
                {submittingMethod === "github" && (
                  <Loader className="ml-2 inline size-4 animate-spin" />
                )}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
