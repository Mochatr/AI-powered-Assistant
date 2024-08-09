import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Customer Service Bot",
  description: "An AI chatbot that you can interact with.",
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
