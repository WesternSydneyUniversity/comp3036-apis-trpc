import { QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Providers } from "./providers";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
