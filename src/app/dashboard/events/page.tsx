"use client";
import { PlusCircle, Pencil, Trash, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const events = [
  { id: 1, title: "Solana Hackathon", date: "Nov 15, 2024", status: "Upcoming", ticketsSold: 120 },
  { id: 2, title: "NFT Art Showcase", date: "Aug 5, 2024", status: "Ongoing", ticketsSold: 75 },
  { id: 3, title: "Web3 Music Festival", date: "July 25, 2024", status: "Ended", ticketsSold: 300 },
];

export default function DashboardEvents() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Manage Events</h1>
        <Link href="/dashboard/events/create" className="bg-primary px-3 md:px-4 py-2 flex items-center gap-1 md:gap-2 rounded-md text-sm md:text-base">
          <PlusCircle size={18} /> Create Event
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          className="bg-gray-800 p-2 rounded-md w-full text-white outline-none text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="bg-gray-800 p-2 rounded-md text-white outline-none w-full md:w-auto text-sm md:text-base">
          <option>All</option>
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Ended</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Event Name</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Date</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Status</th>
              <th className="hidden md:table-cell p-3 text-left text-xs md:text-sm">Tickets Sold</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
              .map((event) => (
                <tr key={event.id} className="border-b border-gray-700 hover:bg-gray-900">
                  <td className="p-2 md:p-3 text-xs md:text-sm">{event.title}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{event.date}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">
                    <span className={`px-2 py-1 text-xs rounded-md ${event.status === "Upcoming" ? "bg-yellow-500" : event.status === "Ongoing" ? "bg-green-500" : "bg-red-500"}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell p-3 text-xs md:text-sm">{event.ticketsSold}</td>
                  <td className="p-2 md:p-3">
                    <div className="flex gap-2">
                      <button className="text-blue-400"><Eye size={16} /></button>
                      <button className="text-yellow-400"><Pencil size={16} /></button>
                      <button className="text-red-400"><Trash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
