"use client";

import { FC, useState } from "react";
import { Search, Ticket, Eye, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

interface TicketProps {
  id: string;
  event: string;
  status: string;
}

interface TicketPropsModal {
  ticket: TicketProps;
  onClose: () => void;
}

const TicketQRModal: FC<TicketPropsModal> = ({ ticket, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-md text-center w-96">
        <h2 className="text-lg font-bold text-white mb-3">Scan Ticket</h2>

        <div className="flex flex-col items-center justify-center">
          <QRCode value={`ticket:${ticket.id}`} size={200} />
        </div>

        <p className="text-sm text-gray-400 mt-2">{ticket.event}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 px-4 py-2 rounded-md text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const tickets = [
  {
    id: "TKT001",
    event: "Solana Hackathon",
    buyer: "Alice Johnson",
    status: "Valid",
  },
  {
    id: "TKT002",
    event: "NFT Art Showcase",
    buyer: "John Doe",
    status: "Used",
  },
  {
    id: "TKT003",
    event: "Web3 Music Festival",
    buyer: "Jane Smith",
    status: "Expired",
  },
];

export default function DashboardTickets() {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<TicketProps | null>(null);

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Manage Tickets</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by event or buyer..."
            className="bg-gray-800 p-2 rounded-md w-full text-white outline-none pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select className="bg-gray-800 p-2 rounded-md text-white outline-none w-full md:w-auto">
          <option>All</option>
          <option>Valid</option>
          <option>Used</option>
          <option>Expired</option>
        </select>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Ticket ID</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Event</th>
              <th className="hidden md:table-cell p-3 text-left text-xs md:text-sm">Buyer</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Status</th>
              <th className="p-2 md:p-3 text-left text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .filter(
                (ticket) =>
                  ticket.event.toLowerCase().includes(search.toLowerCase()) ||
                  ticket.buyer.toLowerCase().includes(search.toLowerCase())
              )
              .map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-gray-700 hover:bg-gray-900"
                >
                  <td className="p-2 md:p-3 text-xs md:text-sm">{ticket.id}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{ticket.event}</td>
                  <td className="hidden md:table-cell md:p-3 text-xs md:text-sm">{ticket.buyer}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${ticket.status === "Valid"
                          ? "bg-green-500"
                          : ticket.status === "Used"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-400">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-green-400"
                      >
                        <QrCode size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <TicketQRModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
