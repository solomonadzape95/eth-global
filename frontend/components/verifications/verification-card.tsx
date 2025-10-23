import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocumentUploadDialog } from "./document-upload-dialog";
import { VerificationDetailsModal } from "./verification-details-modal";
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
    cid?: string;
    baseTxHash?: string;
    isVerified?: boolean;
    verificationType?: string;
    consented?: boolean;
    message?: string;
  };
}

export function VerificationCard({ verification }: VerificationCardProps) {
  const IconComponent = verification.icon;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { loading, status, beginVerification } = useVerification(verification.id);


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
      
      {verification.status === "added" && verification.addedDate && (
        <p className="text-sm text-green-400 mb-2">
          Added on {new Date(verification.addedDate).toLocaleDateString()}
        </p>
      )}
      
      
      <div className="flex items-center justify-center mb-4 absolute top-3 right-3">
        {getStatusBadge(verification.status)}
      </div>
      
      {/* Consent Status Display */}
      {verification.status === "added" && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Badge 
              label={verification.consented ? "Shared with 3rd parties" : "Private"}
              className="text-xs"
            />
            {verification.message && (
              <span className="text-xs text-gray-400">{verification.message}</span>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-auto">
        {verification.status === "added" ? (
          <Button 
            className="w-full" 
            variant="glassPrimary" 
            size={"lg"}
            onClick={() => setDetailsOpen(true)}
          >
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
      
      <VerificationDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        verification={{
          id: verification.id,
          title: verification.title,
          description: verification.description,
          status: verification.status,
          addedDate: verification.addedDate,
          cid: verification.cid,
          baseTxHash: verification.baseTxHash,
          verificationType: verification.verificationType || verification.id,
          isVerified: verification.isVerified || false,
          consented: verification.consented,
          message: verification.message,
          // Add verification-specific data (these would come from the API response)
          university: (verification as any).university,
          student_id: (verification as any).student_id,
          graduation_year: (verification as any).graduation_year,
          country: (verification as any).country,
          is_over_18: (verification as any).is_over_18,
          document_type: (verification as any).document_type,
          company: (verification as any).company,
          position: (verification as any).position,
          salary_range: (verification as any).salary_range,
          address: (verification as any).address,
          biometric_verified: (verification as any).biometric_verified,
          liveness_score: (verification as any).liveness_score
        }}
      />
    </Card>
  );
}
