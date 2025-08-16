// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Orders", href: "/dashboard/orders" },
  ];

  return (
    <div className="w-64 bg-black text-white min-h-screen  py-10 px-2 flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin</h1>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded hover:bg-gray-700 transition ${
            pathname === link.href ? "bg-gray-700 font-semibold" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
