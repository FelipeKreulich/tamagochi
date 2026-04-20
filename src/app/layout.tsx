import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamagochi — Retro Pet",
  description:
    "Jogo estilo Tamagotchi com estética retrô dos anos 90. Cuide do seu bichinho virtual!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${pressStart2P.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider delay={200}>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              className:
                "!font-pixel !rounded-none !border-2 !border-lcd-light !bg-lcd-dark !text-lcd-light",
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
