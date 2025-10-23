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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verification.university && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">University</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.university}</p>
                  </CardContent>
                </Card>
              )}
              {verification.student_id && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Student ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-mono">{verification.student_id}</p>
                  </CardContent>
                </Card>
              )}
              {verification.graduation_year && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Graduation Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.graduation_year}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'identity-verification':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Identity Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verification.country && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.country}</p>
                  </CardContent>
                </Card>
              )}
              {verification.is_over_18 !== undefined && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Age Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge label={verification.is_over_18 ? "18+" : "Under 18"} />
                  </CardContent>
                </Card>
              )}
              {verification.document_type && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Document Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm capitalize">{verification.document_type.replace('_', ' ')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'employment':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verification.company && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Company</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.company}</p>
                  </CardContent>
                </Card>
              )}
              {verification.position && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.position}</p>
                  </CardContent>
                </Card>
              )}
              {verification.salary_range && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Salary Range</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.salary_range}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'proof-of-address':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              {verification.address && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{verification.address}</p>
                  </CardContent>
                </Card>
              )}
              {verification.document_type && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Document Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm capitalize">{verification.document_type.replace('_', ' ')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        
      case 'selfie':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Biometric Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verification.biometric_verified !== undefined && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Biometric Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge label={verification.biometric_verified ? "Verified" : "Not Verified"} />
                  </CardContent>
                </Card>
              )}
              {verification.liveness_score && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Liveness Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{(verification.liveness_score * 100).toFixed(1)}%</p>
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Shield className="w-6 h-6" />
            {verification.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusBadge(verification.status)}
              <span className="text-sm text-white/60">
                {verification.verificationType}
              </span>
            </div>
            {verification.addedDate && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="w-4 h-4" />
                Added {formatDate(verification.addedDate)}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-white/80">{verification.description}</p>
          </div>

          {/* Verification Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* IPFS CID */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  IPFS CID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-white/10 px-2 py-1 rounded flex-1 font-mono">
                    {verification.cid || 'N/A'}
                  </code>
                  {verification.cid && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(verification.cid!, 'cid')}
                      className="p-1 h-8 w-8"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                {copiedField === 'cid' && (
                  <p className="text-xs text-green-400 mt-1">Copied!</p>
                )}
                {verification.cid && (
                  <a
                    href={`https://gateway.lighthouse.storage/ipfs/${verification.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View on Lighthouse
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Base Transaction Hash */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Base Transaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-white/10 px-2 py-1 rounded flex-1 font-mono">
                    {truncateHash(verification.baseTxHash || '')}
                  </code>
                  {verification.baseTxHash && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(verification.baseTxHash!, 'tx')}
                      className="p-1 h-8 w-8"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                {copiedField === 'tx' && (
                  <p className="text-xs text-green-400 mt-1">Copied!</p>
                )}
                {verification.baseTxHash && (
                  <a
                    href={`https://sepolia.basescan.org/tx/${verification.baseTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View on BaseScan
                  </a>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Verification Status Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Status:</span>
                  <span className={`ml-2 ${verification.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                    {verification.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Type:</span>
                  <span className="ml-2 text-white/80">{verification.verificationType}</span>
                </div>
                <div>
                  <span className="text-white/60">Blockchain:</span>
                  <span className="ml-2 text-white/80">Base Sepolia</span>
                </div>
                <div>
                  <span className="text-white/60">Storage:</span>
                  <span className="ml-2 text-white/80">IPFS (Lighthouse)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification-Specific Details */}
          {renderVerificationSpecificDetails()}

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Contract Address:</span>
                  <code className="text-xs bg-white/10 px-2 py-1 rounded font-mono">
                    {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'Not configured'}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Network:</span>
                  <span className="text-white/80">Base Sepolia (Testnet)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Chain ID:</span>
                  <span className="text-white/80">84532</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="glassPrimary" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            {verification.cid && (
              <Button 
                variant="glassLight"
                onClick={() => window.open(`https://gateway.lighthouse.storage/ipfs/${verification.cid}`, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Documents
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
