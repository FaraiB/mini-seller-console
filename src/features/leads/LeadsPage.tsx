import { useState, useMemo } from "react";
import LeadsTable from "./LeadsTable";
import LeadDetailPanel from "./LeadDetailPanel";
import { type Lead } from "./types";
import leadsData from "../../data/leads.json";
import useLocalStorage from "../../hooks/useLoaclStorage";
import type { Opportunity } from "../opportunities/types";

export default function LeadsPage({
  setOpportunities,
}: {
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
}) {
  // Persisted leads
  const [leads, setLeads] = useLocalStorage<Lead[]>(
    "leads",
    leadsData as Lead[]
  );

  // Persisted UI state
  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    "leads_search",
    ""
  );
  const [statusFilter, setStatusFilter] = useLocalStorage<
    (typeof STATUS_OPTIONS)[number]
  >("leads_filter", "All");
  const [sortOrder, setSortOrder] = useLocalStorage<"asc" | "desc">(
    "leads_sort",
    "desc"
  );

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Compute displayed leads
  const filteredLeads = useMemo(() => {
    try {
      return leads
        .filter((l) => statusFilter === "All" || l.status === statusFilter)
        .filter(
          (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.company.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
          sortOrder === "desc" ? b.score - a.score : a.score - b.score
        );
    } catch (err) {
      setError("Failed to process leads. Please refresh the page.");
      return [];
    }
  }, [leads, searchQuery, statusFilter, sortOrder]);

  const handleEdit = (lead: Lead) => setSelectedLead(lead);

  const handleSave = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );
    setSelectedLead(null);
  };

  const handleConvert = (lead: Lead) => {
    const newOpportunity = {
      id: lead.id,
      name: lead.name,
      stage: "Qualification" as const,
      amount: lead.amount,
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, newOpportunity]);

    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: "Converted" } : l))
    );
  };

  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Leads</h1>

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <input
          aria-label="Search leads by name or company"
          type="text"
          placeholder="Search by name or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number])
          }
          className="border p-2 rounded w-full md:w-auto"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="border px-4 py-2 rounded w-full md:w-auto"
        >
          Sort Score: {sortOrder === "desc" ? "▼" : "▲"}
        </button>
      </div>

      <LeadsTable
        leads={filteredLeads}
        onEdit={handleEdit}
        onConvert={handleConvert}
      />

      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleSave}
      />
    </>
  );
}

// Status options
const STATUS_OPTIONS = [
  "All",
  "New",
  "Qualified",
  "Contacted",
  "Disqualified",
  "Converted",
] as const;
