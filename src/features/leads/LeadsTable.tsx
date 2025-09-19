import React, { useMemo, useState } from "react";
import { type Lead } from "./types";

type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
};

const STATUS_OPTIONS = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Disqualified",
  "Converted",
] as const;

export default function LeadsTable({ leads, onEdit, onConvert }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("All");
  // scoreSort: 'desc' (default) | 'asc' | null (no sort)
  const [scoreSort, setScoreSort] = useState<"desc" | "asc" | null>("desc");

  const toggleScoreSort = () => {
    setScoreSort((prev) =>
      prev === "desc" ? "asc" : prev === "asc" ? null : "desc"
    );
  };

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = leads.filter((l) => {
      const hay = (l.name + " " + l.company).toLowerCase();
      return query === "" ? true : hay.includes(query);
    });

    if (statusFilter !== "All") {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (scoreSort) {
      result = [...result].sort((a, b) =>
        scoreSort === "desc" ? b.score - a.score : a.score - b.score
      );
    }

    return result;
  }, [leads, search, statusFilter, scoreSort]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          aria-label="Search leads by name or company"
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number])
          }
          className="border px-3 py-2 rounded w-full md:w-auto"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={toggleScoreSort}
          className="border px-3 py-2 rounded w-full md:w-auto"
          aria-pressed={scoreSort !== null}
        >
          Sort:{" "}
          {scoreSort === "desc"
            ? "Score ↓"
            : scoreSort === "asc"
            ? "Score ↑"
            : "None"}
        </button>
      </div>

      {/* Table */}
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
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No leads match your search / filters.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
