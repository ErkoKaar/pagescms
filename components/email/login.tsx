import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { emailTheme } from "@/components/email/theme";

export const LoginEmailTemplate = ({
  email,
  otp,
  preview = "Karli CMS-i sisselogimiskood",
}: {
  email: string;
  otp: string;
  preview?: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body
          className="my-auto mx-auto font-sans px-2 antialiased"
          style={{
            backgroundColor: emailTheme.background,
            color: emailTheme.foreground,
          }}
        >
          <Container className="my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading
              className="text-[24px] font-semibold p-0 my-[30px] mx-0 text-center tracking-tight"
              style={{ color: emailTheme.foreground }}
            >
              Logi sisse Karli CMS-i
            </Heading>
            <Text
              className="text-[16px] leading-[24px]"
              style={{ color: emailTheme.foreground }}
            >
              Sisesta see kood sisselogimise lehel:
            </Text>
            <Section className="text-center mt-[24px] mb-[24px]">
              <pre
                className="inline-block rounded-lg border-0 text-[28px] font-medium"
                style={{
                  backgroundColor: emailTheme.muted,
                  color: emailTheme.foreground,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  letterSpacing: "8px",
                  lineHeight: 1,
                  marginBottom: 0,
                  marginTop: 0,
                  padding: "12px 4px 12px 12px",
                }}
              >
                {otp}
              </pre>
            </Section>
            <Text
              className="text-[16px] leading-[24px]"
              style={{ color: emailTheme.foreground }}
            >
              Kood kehtib 5 minutit.
            </Text>
            <Text
              className="text-[14px] leading-[24px] mt-[36px]"
              style={{ color: emailTheme.mutedForeground }}
            >
              See kiri saadeti aadressile{" "}
              <Link
                href={`mailto:${email}`}
                className="underline"
                style={{ color: emailTheme.mutedLink }}
              >
                {email}
              </Link>
              . Kui sa ei proovinud sisse logida, võid selle kirja kustutada.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
