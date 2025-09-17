import { useState } from "react";
import leadsData from "../../data/leads.json";
import { type Lead } from "./types";
import LeadsTable from "./LeadsTable";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(leadsData as Lead[]);
  return (
    <div className="p-4">
      <h1 className="text-2xl fon-bold mb-4">Leads</h1>
      <LeadsTable leads={leads} />
    </div>
  );
}
