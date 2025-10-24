"use client"
import { Button } from "./ui/button";
import { useAccount, useBalance } from "wagmi";
import { modal } from "@/context/provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Explicitly define the allowed variants that Button accepts
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "glassPrimary"
  | "glassNeutral"
  | "glassLight";

interface ConnectButtonProps {
  variant?: ButtonVariant;
  label?: string;
  onClick?: (() => void) | null;
}

export default function ConnectButton({
  variant = "glassLight",
  label = "Get Started",
  onClick = null,
}: ConnectButtonProps) {
  const { isConnected, address } = useAccount();
  const router = useRouter()
  const { data: balance } = useBalance({
    address: address,
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {    
    setIsConnecting(true);
    try {
      await modal.open();
      if(isConnected) router.replace("/dashboard/verifications")
    } catch (e) {
      console.error("Wallet modal failed to open", e);
    } finally {
      setIsConnecting(false);
      if (onClick) onClick();
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (balance: bigint | undefined, decimals: number | undefined) => {
    if (!balance || !decimals) return "0.00";
    const divisor = BigInt(10 ** decimals);
    const etherValue = Number(balance) / Number(divisor);
    return etherValue.toFixed(4);
  };

  return (
    <Button
      className="w-full"
      size="lg"
      variant={variant}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Connecting...
        </div>
      ) : isConnected ? (
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium">
            {formatAddress(address || "")}
          </div>
          <div className="text-xs opacity-80">
            {formatBalance(balance?.value, balance?.decimals)} {balance?.symbol}
          </div>
        </div>
      ) : (
        label
      )}
    </Button>
  );
}