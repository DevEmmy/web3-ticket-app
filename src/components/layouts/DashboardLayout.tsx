"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import WalletFormatter from "../utils/wallet-formatter";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { publicKey } = useWallet();

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-black">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: static, Mobile: fixed overlay */}
      <aside
        className={`bg-[#111] text-white w-[280px] md:w-64 fixed md:static h-screen z-30
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "left-0" : "-left-[280px] md:left-0"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <Link href={"/"} className="text-xl font-bold">EventFi</Link>
          <button
            className="md:hidden text-gray-500 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-70px)] p-5">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div
                  className={`p-3 rounded-lg transition ${pathname === link.path ? "bg-[#222]" : "hover:bg-[#222]"
                    }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-800 pt-4">
            <button className="flex w-full items-center p-3 gap-2 cursor-pointer hover:bg-[#222] rounded-lg text-gray-400 hover:text-red-400 transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-[#222] text-white px-5 py-4 flex justify-between items-center md:hidden z-10">
          <button
            className="text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="ml-auto flex items-center gap-2">
            {publicKey && <WalletFormatter publicKey={publicKey?.toString() || ""} />}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#000] text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
