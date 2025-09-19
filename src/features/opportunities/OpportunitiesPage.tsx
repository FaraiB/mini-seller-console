import { type Opportunity } from "./types";

type Props = {
  opportunities: Opportunity[];
};

export default function OpportunitiesPage({ opportunities }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Opportunities</h1>

      {opportunities.length === 0 ? (
        <p className="text-gray-500">No opportunities yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Stage</th>
                <th className="px-4 py-2 text-left">Account</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr
                  key={opp.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{opp.id}</td>
                  <td className="px-4 py-2">{opp.name}</td>
                  <td className="px-4 py-2">{opp.stage}</td>
                  <td className="px-4 py-2">{opp.accountName}</td>
                  <td className="px-4 py-2">{opp.amount ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
