import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Which Anime Character Are You? | Marshmallow Tech",
  description: "A Marshmallow Tech anime personality quiz built for fans, by fans.",
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
