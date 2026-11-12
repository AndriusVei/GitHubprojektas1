import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suma — paprastas kalkuliatorius",
  description: "Sudėkite du skaičius. Paprastai, aiškiai ir vienoje vietoje.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="lt"><body>{children}</body></html>;
}
