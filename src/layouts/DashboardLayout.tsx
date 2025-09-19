import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md px-6 py-4 text-2xl font-bold sticky top-0 z-10">
        Mini Seller Console
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
