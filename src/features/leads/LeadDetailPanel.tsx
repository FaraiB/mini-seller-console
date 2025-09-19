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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{lead.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            className="border rounded px-2 py-1 w-full"
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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={validateAndSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
