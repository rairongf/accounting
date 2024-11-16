import { AuthProvider, AuthStateProvider } from "@/modules/auth";
import { DialogProvider } from "@/modules/common";
import { SessionProvider, SessionStateProvider } from "@/modules/session";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Nunito_Sans } from "next/font/google";
import "./styles/globals.css";
import "./styles/material_icons.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Accounting App",
  description: "Accounting Management App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${nunitoSans.className} w-screen h-screen overflow-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthStateProvider>
            <AuthProvider>
              <SessionStateProvider>
                <SessionProvider>
                  <DialogProvider>{children}</DialogProvider>
                </SessionProvider>
              </SessionStateProvider>
            </AuthProvider>
          </AuthStateProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
