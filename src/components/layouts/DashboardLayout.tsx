"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User, LogOut } from "lucide-react";
import WalletFormatter from "../utils/wallet-formatter";
import { useWallet } from "@solana/wallet-adapter-react";
import AnimatedBackground from "../ui/AnimatedBackground";

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

  const {publicKey} = useWallet();

  return (
    <div className="flex h-screen">
      {/* <AnimatedBackground /> */}
      {/* Sidebar */}
      <aside
        className={`bg-[#111] text-white w-64 p-5 transition-all ${
          isSidebarOpen ? "block" : "hidden"
        } sm:block`}
      >
        <Link href={"/"} className="text-xl font-bold mb-5">EventFi</Link>
        <div className="flex flex-col justify-between gap-20 my-10">
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

          <p className="flex items-center p-3 gap-2 cursor-pointer">
            Logout 
            <LogOut className="cursor-pointer text-red-400" size={20} />
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-[#222] text-white px-5 py-5 flex justify-between items-center">
          <button
            className="sm:hidden text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>

            
          <div className="flex justify-end">
            <WalletFormatter publicKey={publicKey?.toString() || ""} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 bg-[#000] text-white">{children}</main>
      </div>
    </div>
  );
}
