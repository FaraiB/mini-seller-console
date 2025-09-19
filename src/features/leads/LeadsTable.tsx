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
    <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No leads match your search / filters.
        </div>
      ) : (
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                ID
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Company
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Source
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Score
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, idx) => (
              <tr
                key={lead.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="px-4 py-3 border-b border-gray-300">
                  {lead.id}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {lead.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {lead.company}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {lead.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {lead.source}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.score >= 80
                        ? "bg-green-200 text-green-900"
                        : lead.score >= 50
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    {lead.score}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.status === "New"
                        ? "bg-blue-200 text-blue-900"
                        : lead.status === "Contacted"
                        ? "bg-yellow-200 text-yellow-900"
                        : lead.status === "Qualified"
                        ? "bg-green-200 text-green-900"
                        : lead.status === "Disqualified"
                        ? "bg-gray-300 text-gray-900"
                        : "bg-purple-200 text-purple-900"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-300 flex flex-col sm:flex-row gap-2">
                  <button
                    className="px-3 py-1 text-sm border border-gray-400 rounded 
             hover:bg-gray-300 hover:shadow-sm transition-all"
                    onClick={() => onEdit(lead)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
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
