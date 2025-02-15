import React from "react";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Kitap Dünyasi",
};

export default function layout  ({ children })  {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};


