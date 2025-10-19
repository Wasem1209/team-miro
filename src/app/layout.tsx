import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Acme } from "next/font/google";

const acme = Acme({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "team-miro",
  description: "Fast easy car renting",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={acme.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
