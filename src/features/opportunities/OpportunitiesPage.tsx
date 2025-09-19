import { type Opportunity } from "./types";

type Props = {
  opportunities: Opportunity[];
  loading?: boolean;
  error?: string | null;
};

export default function OpportunitiesPage({
  opportunities,
  loading = false,
  error = null,
}: Props) {
  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Opportunities</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : opportunities.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No opportunities available.
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
                  Stage
                </th>
                <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold border-b border-gray-600">
                  Account Name
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp, idx) => (
                <tr
                  key={opp.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-3 border-b border-gray-300">
                    {opp.id}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {opp.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {opp.stage}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">{`R$ ${opp.amount}`}</td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {opp.accountName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
