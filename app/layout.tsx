import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Southwest Regional Stakeholder Summit | 150MWp Floating Solar PV",
  description:
    "Official VIP invitation to the Southwest Regional Stakeholder Summit on the 150MWp Floating Solar PV Power Plant Infrastructure Pipeline. 3 to 5 December 2026, IITA Conference Center, Ibadan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${anton.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
