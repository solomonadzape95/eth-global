"use client";

import { useState } from "react";
import { SearchBar } from "@/components/verifications/search-bar";
import { Tabs } from "@/components/verifications/tabs";
import { VerificationGrid } from "@/components/verifications/verification-grid";
import { EmptyState } from "@/components/verifications/empty-state";
import { useVerifications } from "@/hooks/use-verifications";

export default function Verifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, verifications, error } = useVerifications();

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verification.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "added") return matchesSearch && verification.status === "added";
    if (activeTab === "not-added") return matchesSearch && verification.status === "not-added";
    return matchesSearch;
  });

  const tabs = [
    { id: "all", label: "All", count: verifications.length },
    { id: "added", label: "Added", count: verifications.filter(v => v.status === "added").length },
    { id: "not-added", label: "Not Added", count: verifications.filter(v => v.status === "not-added").length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto mt-3 md:mt-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-white/60">Loading verifications...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto mt-3 md:mt-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-400">Error loading verifications: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto mt-3 md:mt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Verifications</h1>
          <p className="text-white/60">Manage your identity verifications and credentials</p>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              ⚠️ <strong>Demo Notice:</strong> All verifications shown are mock data for demonstration purposes only. 
              This is a prototype application and does not represent real identity verification data.
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Verification Cards Grid */}
        {filteredVerifications.length > 0 ? (
          <VerificationGrid verifications={filteredVerifications} />
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
}