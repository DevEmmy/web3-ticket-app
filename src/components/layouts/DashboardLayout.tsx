"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User, LogOut } from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Events", path: "/dashboard/events" },
  { name: "Tickets", path: "/dashboard/tickets" },
  { name: "Transactions", path: "/dashboard/transactions" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#111] text-white w-64 p-5 transition-all ${
          isSidebarOpen ? "block" : "hidden"
        } sm:block`}
      >
        <h2 className="text-xl font-bold mb-5">🎟️ Event Manager</h2>
        <nav>
          {sidebarLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <div
                className={`p-3 my-2 rounded-lg transition ${
                  pathname === link.path ? "bg-[#222]" : "hover:bg-[#222]"
                }`}
              >
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-[#222] text-white px-5 py-3 flex justify-between items-center">
          <button
            className="sm:hidden text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" size={20} />
            <User className="cursor-pointer" size={20} />
            <LogOut className="cursor-pointer text-red-400" size={20} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 bg-[#000] text-white">{children}</main>
      </div>
    </div>
  );
}
