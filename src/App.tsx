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

  const tabs = ["Leads", "Opportunities"] as const;

  return (
    <DashboardLayout>
      {/* Tabs */}
      <div className="mb-6 flex border-b border-gray-300">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 -mb-px font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Leads" ? (
        <LeadsPage setOpportunities={setOpportunities} />
      ) : (
        <OpportunitiesPage opportunities={opportunities} />
      )}
    </DashboardLayout>
  );
}

export default App;
