import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BuildFleet — Construction equipment marketplace",
    template: "%s | BuildFleet",
  },
  description:
    "Request backhoe loaders from reviewed equipment suppliers and compare structured quotes.",
  icons: {
    icon: "/images/backhoe-loader-cutout.png",
    shortcut: "/images/backhoe-loader-cutout.png",
  },
  openGraph: {
    title: "The right equipment. Verified suppliers. One request.",
    description:
      "A buyer-first construction equipment marketplace prototype for India.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
