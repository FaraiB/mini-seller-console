import { useState, useEffect } from "react";
import { type Lead } from "./types";

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
};

export default function LeadDetailPanel({ lead, onClose, onSave }: Props) {
  const [email, setEmail] = useState(lead?.email ?? "");
  const [status, setStatus] = useState<Lead["status"]>(lead?.status ?? "New");
  const [error, setError] = useState("");

  if (!lead) return null;

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onSave({ ...lead, email, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-end">
      {/*backdrop*/}
      <div className="fixed inset-0 bg-gray-50/50" onClick={onClose}></div>
      {/*panel*/}
      <div className="relative w-96 bg-white shadow-lg p-6 overflow-y-auto z-10">
        <h2 className="text-lg font-bold mb-4">Edit Lead</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stauts</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Lead["status"])}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Disqualified">Disqualified</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
