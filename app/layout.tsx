
import React from 'react';
import "./globals.css";

export const metadata = {
  title: "CareSync Pro | Institutional ERP",
  description: "High-Fidelity Clinical Fleet Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
