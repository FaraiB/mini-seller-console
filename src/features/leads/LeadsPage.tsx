import { useEffect, useState } from "react";
import LeadsTable from "./LeadsTable";
import LeadDetailPanel from "./LeadDetailPanel";
import { type Lead } from "./types";
import leadsData from "../../data/leads.json";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    setLeads(leadsData as Lead[]);
  }, []);

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleConvert = (lead: Lead) => {
    console.log("Convert clicked:", lead);
  };

  const handleSave = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <LeadsTable leads={leads} onEdit={handleEdit} onConvert={handleConvert} />

      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleSave}
      />
    </div>
  );
}
