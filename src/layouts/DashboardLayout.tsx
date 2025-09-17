import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 text-xl font-bold">
        Mini Seller Console
      </header>
      <main p-4>{children}</main>
    </div>
  );
};

export default DashboardLayout;
