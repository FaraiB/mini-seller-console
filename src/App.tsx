import { useState } from "react";
import LeadsPage from "./features/leads/LeadsPage";
import OpportunitiesPage from "./features/opportunities/OpportunitiesPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { type Opportunity } from "./features/opportunities/types";
import useLocalStorage from "./hooks/useLoaclStorage";

function App() {
  const [tab, setTab] = useState<"Leads" | "Opportunities">("Leads");
  const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>(
    "opportunities",
    []
  );
  return (
    <DashboardLayout>
      <div className="mb-4">
        <button onClick={() => setTab("Leads")} className="mr-20">
          Leads
        </button>
        <button onClick={() => setTab("Opportunities")}>Opportunities</button>
      </div>
      {tab === "Leads" ? (
        <LeadsPage setOpportunities={setOpportunities} />
      ) : (
        <OpportunitiesPage opportunities={opportunities} />
      )}
    </DashboardLayout>
  );
}

export default App;
