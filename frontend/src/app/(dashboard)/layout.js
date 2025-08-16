// dashboard/layout.js

import Sidebar from "@/components/pages/Dashboard/Sidebar";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
