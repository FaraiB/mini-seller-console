import { type Lead } from "./types";

type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  loading?: boolean;
};

export default function LeadsTable({
  leads,
  onEdit,
  onConvert,
  loading = false,
}: Props) {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No leads match your search / filters.
        </div>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{lead.id}</td>
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.company}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.score >= 80
                        ? "bg-green-100 text-green-800"
                        : lead.score >= 50
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {lead.score}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : lead.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-800"
                        : lead.status === "Qualified"
                        ? "bg-green-100 text-green-800"
                        : lead.status === "Disqualified"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition-colors"
                    onClick={() => onEdit(lead)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    onClick={() => onConvert(lead)}
                  >
                    Convert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
