import { type Lead } from "./types";

type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
};

export default function LeadsTable({ leads, onEdit, onConvert }: Props) {
  return (
    <div className="overflow-x-auto">
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
              className="border-t even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <td className="px-4 py-2">{lead.id}</td>
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.company}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.source}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
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
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    lead.status === "New"
                      ? "bg-blue-100 text-blue-800"
                      : lead.status === "Contacted"
                      ? "bg-yellow-100 text-yellow-800"
                      : lead.status === "Qualified"
                      ? "bg-green-100 text-green-800"
                      : lead.status === "Disqualified"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(lead)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onConvert(lead)}
                  className="text-green-600 hover:underline"
                >
                  Convert
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
