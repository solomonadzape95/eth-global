import { VerificationCard } from "./verification-card";

interface Verification {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: string;
  addedDate?: string;
}

interface VerificationGridProps {
  verifications: Verification[];
}

export function VerificationGrid({ verifications }: VerificationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {verifications.map((verification) => (
        <VerificationCard key={verification.id} verification={verification} />
      ))}
    </div>
  );
}
