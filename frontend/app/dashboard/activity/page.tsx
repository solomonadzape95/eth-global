"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Shield,
  Clock,
  Search,
  Filter
} from "lucide-react";

const activityData = [
  {
    id: "1",
    who: "https://www.google.com/search?q=CryptoService.com",
    what: "Asked to confirm: Age Over 18",
    when: "Today at 9:01 PM",
    status: "approved",
    timestamp: new Date("2024-01-15T21:01:00"),
    dataRequested: ["Age verification", "Location (Country)"]
  },
  {
    id: "2", 
    who: "https://app.uniswap.org",
    what: "Requested: Government ID verification",
    when: "Yesterday at 2:30 PM",
    status: "approved",
    timestamp: new Date("2024-01-14T14:30:00"),
    dataRequested: ["Government ID", "Full name", "Date of birth"]
  },
  {
    id: "3",
    who: "https://opensea.io",
    what: "Asked to confirm: Identity verification",
    when: "2 days ago at 11:45 AM", 
    status: "denied",
    timestamp: new Date("2024-01-13T11:45:00"),
    dataRequested: ["Selfie verification", "Government ID"]
  },
  {
    id: "4",
    who: "https://www.coinbase.com",
    what: "Requested: KYC verification",
    when: "3 days ago at 4:20 PM",
    status: "approved", 
    timestamp: new Date("2024-01-12T16:20:00"),
    dataRequested: ["Government ID", "Proof of address", "Selfie verification"]
  },
  {
    id: "5",
    who: "https://app.aave.com",
    what: "Asked to confirm: Age and location",
    when: "1 week ago at 8:15 AM",
    status: "approved",
    timestamp: new Date("2024-01-08T08:15:00"),
    dataRequested: ["Age verification", "Location (Country)", "Basic identity"]
  },
  {
    id: "6",
    who: "https://www.binance.com",
    what: "Requested: Full identity verification",
    when: "2 weeks ago at 3:10 PM",
    status: "pending",
    timestamp: new Date("2024-01-01T15:10:00"),
    dataRequested: ["Government ID", "Proof of address", "Selfie verification", "Employment verification"]
  }
];

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredActivities = activityData.filter(activity => {
    const matchesSearch = activity.who.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.what.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.dataRequested.some(data => data.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge label="approved" />;
      case "denied":
        return <Badge label="denied" />;
      case "pending":
        return <Badge label="pending" />;
      default:
        return <Badge label="unknown" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "denied":
        return "text-red-400";
      case "pending":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto mt-3 md:mt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Activity</h1>
          <p className="text-white/60">Track every time your identity was used or requested</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400/40 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "approved", "denied", "pending"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize",
                  statusFilter === status
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-white/60 hover:text-white/80 hover:bg-white/10"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="bg-gradient-to-b from-white/10 to-white/5 border-white/10 backdrop-blur-md hover:from-white/15 hover:to-white/10 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Shield className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg font-semibold mb-1">
                          {activity.what}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <ExternalLink className="w-4 h-4" />
                          <span className="truncate">{activity.who}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {activity.dataRequested.map((data, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded border border-white/10"
                        >
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-white/60 text-sm">{activity.when}</span>
                    </div>
                    <div className={cn("text-sm font-medium", getStatusColor(activity.status))}>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Identity Request</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatRelativeTime(activity.timestamp)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>Request ID: {activity.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No activity found</h3>
            <p className="text-white/60">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search terms or filters" 
                : "No identity requests have been made yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

