"use client";

import ContextProvider from "@/context/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ContextProvider cookies={null}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ContextProvider>
  );
}
