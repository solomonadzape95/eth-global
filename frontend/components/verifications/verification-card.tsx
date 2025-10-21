import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocumentUploadDialog } from "./document-upload-dialog";
import { useState } from "react";
import { useVerification } from "@/hooks/use-verification";

interface VerificationCardProps {
  verification: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    status: string;
    addedDate?: string;
  };
}

export function VerificationCard({ verification }: VerificationCardProps) {
  const IconComponent = verification.icon;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, status, beginVerification } = useVerification();


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "added":
        return <Badge label="verified" />;
      case "coming-soon":
        return <Badge label="coming-soon" />;
      default:
        return <Badge label="not-added" />;
    }
  };

  const handleUpload = async (files: File[]) => {
    // In a real flow, we'd send files to backend, then call beginVerification
    await beginVerification();
    setDialogOpen(false);
  };

  return (
    <Card
      className={cn(
        "p-4 flex flex-col justify-start gap-4 h-[500px] relative overflow-hidden group",
        verification.status === "added" && "ring-2 ring-green-400/20"
      )}
    >
      <section>
        <h3 className="text-xl">{verification.title}</h3>
        <p className="text-white/60 text-lg">{verification.description}</p>
      </section>
      
      <div className={cn(
        "w-full flex-1 grid place-content-center",
        verification.status === "added" 
          ? "bg-green-400/20 text-green-400" 
          : verification.status === "coming-soon"
          ? "bg-yellow-400/20 text-yellow-400"
          : "bg-white/10 text-white/60"
      )}>
        <IconComponent className="w-36 h-36" />
      </div>
      
      {verification.status === "added" && (
        <p className="text-sm text-green-400 mb-2">
          Added on {new Date(verification.addedDate!).toLocaleDateString()}
        </p>
      )}
      
      
      <div className="flex items-center justify-center mb-4 absolute top-3 right-3">
        {getStatusBadge(verification.status)}
      </div>      
      
      <div className="mt-auto">
        {status?.is_verified || verification.status === "added" ? (
          <Button className="w-full" variant="glassPrimary" size={"lg"}>
            View Details
          </Button>
        ) : verification.status === "coming-soon" ? (
          <Button
            className="w-full"
            variant="glassLight"
            size={"lg"}
            disabled
          >
            Coming Soon
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="glassLight" 
            size={"lg"}
            onClick={() => setDialogOpen(true)}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              "Add Verification"
            )}
          </Button>
        )}
      </div>
      
      <DocumentUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        verificationType={verification.title}
        onUpload={handleUpload}
      />
    </Card>
  );
}
