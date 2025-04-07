"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode } from "react";
import { trpc } from "../utils/trpc";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider
        client={trpc.createClient({
          links: [httpBatchLink({ url: "/api/trpc" })],
        })}
        queryClient={queryClient}
      >
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
