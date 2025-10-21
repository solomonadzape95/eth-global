import { Filter } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Filter className="w-16 h-16 text-white/20 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">No verifications found</h3>
      <p className="text-white/60">
        {searchQuery ? "Try adjusting your search terms" : "No verifications match the selected filter"}
      </p>
    </div>
  );
}
