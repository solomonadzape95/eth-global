"use client"

import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { checkStatus, startVerification, type CheckStatusResponse, type StartVerificationResponse } from "@/lib/api";

export function useVerification() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<CheckStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const res = await checkStatus(address);
      setStatus(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected) {
      fetchStatus();
    }
  }, [isConnected, fetchStatus]);

  const beginVerification = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const res: StartVerificationResponse = await startVerification(address);
      // After start, re-check status
      await fetchStatus();
      return res;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }, [address, fetchStatus]);

  return { loading, status, error, fetchStatus, beginVerification };
}

