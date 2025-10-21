import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  className?: string;
}

export function Badge({ label, className }: BadgeProps) {
  const getBadgeStyles = (label: string) => {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, '-');
    
    switch (normalizedLabel) {
      case 'added':
      case 'verified':
        return {
          bg: 'bg-green-900/20',
          text: 'text-green-400',
          border: 'border-green-400/20'
        };
      case 'coming-soon':
        return {
          bg: 'bg-yellow-900/20',
          text: 'text-yellow-400',
          border: 'border-yellow-400/20'
        };
      case 'not-added':
      case 'pending':
        return {
          bg: 'bg-gray-900/20',
          text: 'text-gray-400',
          border: 'border-gray-400/20'
        };
      case 'approved':
        return {
          bg: 'bg-green-900/20',
          text: 'text-green-400',
          border: 'border-green-400/20'
        };
      case 'denied':
        return {
          bg: 'bg-red-900/20',
          text: 'text-red-400',
          border: 'border-red-400/20'
        };
      default:
        return {
          bg: 'bg-blue-900/20',
          text: 'text-blue-400',
          border: 'border-blue-400/20'
        };
    }
  };

  const styles = getBadgeStyles(label);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium border transition-colors",
        styles.bg,
        styles.text,
        styles.border,
        className
      )}
    >
      {label.toUpperCase()}
    </span>
  );
}
