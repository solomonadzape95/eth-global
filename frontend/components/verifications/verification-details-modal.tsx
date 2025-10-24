import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Calendar, Hash, Shield, FileText } from "lucide-react";
import { useState } from "react";

interface VerificationDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  addedDate?: string;
  cid?: string;
  baseTxHash?: string;
  verificationType: string;
  isVerified: boolean;
  consented?: boolean;
  message?: string;
  // Verification-specific data
  university?: string;
  student_id?: string;
  graduation_year?: string;
  country?: string;
  is_over_18?: boolean;
  document_type?: string;
  company?: string;
  position?: string;
  salary_range?: string;
  address?: string;
  biometric_verified?: boolean;
  liveness_score?: number;
}

interface VerificationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verification: VerificationDetails;
}

export function VerificationDetailsModal({ 
  open, 
  onOpenChange, 
  verification 
}: VerificationDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const truncateHash = (hash: string, length: number = 8) => {
    if (!hash) return 'N/A';
    return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
  };

  // Render verification-specific details
  const renderVerificationSpecificDetails = () => {
    const { verificationType } = verification;
    
    switch (verificationType) {
      case 'student':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">STUDENT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verification.university && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">University</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.university}</p>
                  </CardContent>
                </Card>
              )}
              {verification.student_id && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Student ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base font-mono text-white/90">{verification.student_id}</p>
                  </CardContent>
                </Card>
              )}
              {verification.graduation_year && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Graduation Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.graduation_year}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'identity-verification':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">IDENTITY INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verification.country && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.country}</p>
                  </CardContent>
                </Card>
              )}
              {verification.is_over_18 !== undefined && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Age Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge label={verification.is_over_18 ? "18+" : "Under 18"} />
                  </CardContent>
                </Card>
              )}
              {verification.document_type && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Document Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90 capitalize">{verification.document_type.replace('_', ' ')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'employment':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">EMPLOYMENT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verification.company && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Company</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.company}</p>
                  </CardContent>
                </Card>
              )}
              {verification.position && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.position}</p>
                  </CardContent>
                </Card>
              )}
              {verification.salary_range && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Salary Range</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.salary_range}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'proof-of-address':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">ADDRESS INFORMATION</h3>
            <div className="grid grid-cols-1 gap-6">
              {verification.address && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{verification.address}</p>
                  </CardContent>
                </Card>
              )}
              {verification.document_type && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Document Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90 capitalize">{verification.document_type.replace('_', ' ')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'selfie':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">BIOMETRIC INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verification.biometric_verified !== undefined && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Biometric Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge label={verification.biometric_verified ? "Verified" : "Not Verified"} />
                  </CardContent>
                </Card>
              )}
              {verification.liveness_score && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">Liveness Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-white/90">{(verification.liveness_score * 100).toFixed(1)}%</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] lg:w-[90vw] xl:w-[80vw] max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-black to-black/40 backdrop-blur-xl border border-white/10">
        {/* <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold flex items-center gap-4 text-white">
            <Shield className="w-8 h-8 text-primary" />
            {verification.title}
          </DialogTitle>
        </DialogHeader> */}

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="flex items-center gap-4 w-full">
              <span className="text-lg font-semibold text-white/80 uppercase tracking-wider">
                {verification.verificationType.replace('-', ' ')}
              </span>
              {getStatusBadge(verification.status)}
            </div>
            {verification.addedDate && (
              <div className="flex items-center w-full gap-3 text-base text-white/70">
                <Calendar className="w-5 h-5" />
                <span>Added {formatDate(verification.addedDate)}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Description</h3>
            <p className="text-lg text-white/80 leading-relaxed">{verification.description}</p>
          </div>

          {/* Verification Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* IPFS CID */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                  <FileText className="w-5 h-5 text-primary" />
                  IPFS CID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <code className="text-sm bg-white/10 px-3 py-2 rounded-lg flex-1 font-mono text-white/90 break-all">
                    {verification.cid ? truncateHash(verification.cid, 12) : 'N/A'}
                  </code>
                  {verification.cid && (
                    <Button
                      onClick={() => copyToClipboard(verification.cid!, 'cid')}
                      className="p-2 h-10 w-10 hover:bg-white/10 bg-transparent border-none"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {copiedField === 'cid' && (
                  <p className="text-sm text-green-400 mt-2 font-medium">✓ Copied to clipboard!</p>
                )}
                {verification.cid && (
                  <a
                    href={`https://gateway.lighthouse.storage/ipfs/${verification.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 mt-3 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Lighthouse Gateway
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Base Transaction Hash */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                  <Hash className="w-5 h-5 text-primary" />
                  Transaction Hash
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <code className="text-sm bg-white/10 px-3 py-2 rounded-lg flex-1 font-mono text-white/90 break-all">
                    {verification.baseTxHash ? truncateHash(verification.baseTxHash, 12) : 'N/A'}
                  </code>
                  {verification.baseTxHash && (
                    <Button
                      onClick={() => copyToClipboard(verification.baseTxHash!, 'tx')}
                      className="p-2 h-10 w-10 hover:bg-white/10 bg-transparent border-none"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {copiedField === 'tx' && (
                  <p className="text-sm text-green-400 mt-2 font-medium">✓ Copied to clipboard!</p>
                )}
                {verification.baseTxHash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${verification.baseTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 mt-3 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on BaseScan
                  </a>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Verification Status Details */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Status:</span>
                  <span className={`font-semibold ${verification.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                    {verification.isVerified ? '✓ Verified' : '✗ Not Verified'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Type:</span>
                  <span className="text-white/90 font-semibold uppercase tracking-wide">
                    {verification.verificationType.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Blockchain:</span>
                  <span className="text-white/90 font-semibold">Base Sepolia</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Storage:</span>
                  <span className="text-white/90 font-semibold">IPFS (Lighthouse)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification-Specific Details */}
          {renderVerificationSpecificDetails()}

          {/* Technical Details */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-base">
                <div className="flex flex-col gap-2">
                  <span className="text-white/70 font-medium">Contract Address:</span>
                  <code className="text-sm bg-white/10 px-3 py-2 rounded-lg font-mono text-white/90 break-all">
                    {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'Not configured'}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Network:</span>
                  <span className="text-white/90 font-semibold">Base Sepolia (Testnet)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Chain ID:</span>
                  <span className="text-white/90 font-semibold">84532</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-medium">Storage Provider:</span>
                  <span className="text-white/90 font-semibold">Lighthouse Protocol</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button 
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 text-lg font-semibold rounded-2xl text-white border border-white/10 backdrop-blur-md bg-gradient-to-b hover:from-[hsl(var(--primary)/0.39)] hover:to-[hsl(var(--primary)/0.32)] shadow-[0_8px_28px_rgba(16,185,129,0.25)] from-[hsl(var(--primary)/0.48)] to-[hsl(var(--primary)/0.56)]"
            >
              Close
            </Button>
            {verification.cid && (
              <Button 
                onClick={() => window.open(`https://gateway.lighthouse.storage/ipfs/${verification.cid}`, '_blank')}
                className="flex-1 h-12 text-lg font-semibold rounded-2xl bg-white/85 text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-black/10 backdrop-blur-md hover:bg-white/70"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Documents
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
