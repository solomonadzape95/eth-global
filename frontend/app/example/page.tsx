"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function ExamplePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("/api/hello");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">React Query Example</h1>
          <p className="text-muted-foreground">
            This page demonstrates TanStack React Query integration
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">API Response</h2>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              size="sm"
              variant="outline"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-4 h-4" />
              Error loading data
            </div>
          )}

          {data && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Success</span>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
