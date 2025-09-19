import { type Lead } from "./types";
import { useEffect, useState } from "react";

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updated: Lead) => void;
};

export default function LeadDetailPanel({ lead, onClose, onSave }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Lead["status"]>("New");
  const [error, setError] = useState("");

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
    }
  }, [lead]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!lead) return null;

  const validateAndSave = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }
    setError("");
    onSave({ ...lead, email, status });
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-96 h-full shadow-xl transform transition-transform translate-x-0 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-gray-900 font-bold">{lead.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Status
          </label>
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as Lead["status"])}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Disqualified</option>
            <option>Converted</option>
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            onClick={validateAndSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
