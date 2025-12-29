
import React from 'react';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareSync Pro | Next",
  description: "High-Fidelity Clinical ERP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
