import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suma — paprastas kalkuliatorius",
  description: "Sudėkite, atimkite, dauginkite, dalykite ir skaičiuokite procentus moderniame, paprastame kalkuliatoriuje.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="lt"><body>{children}</body></html>;
}
