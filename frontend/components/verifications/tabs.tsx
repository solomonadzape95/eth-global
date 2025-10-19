import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/60 hover:text-white/80 hover:bg-white/5"
            )}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
    </div>
  );
}
