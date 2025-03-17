"use client"
import { useState } from "react";
import { Eye, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const transactions = [
  { id: "T001", date: "Aug 20, 2024", event: "Solana Hackathon", amount: "2 SOL", status: "Success" },
  { id: "T002", date: "Aug 19, 2024", event: "Web3 NFT Summit", amount: "1.5 SOL", status: "Pending" },
  { id: "T003", date: "Aug 15, 2024", event: "Blockchain Meetup", amount: "1 SOL", status: "Failed" },
];

const getStatusBadge = (status: string) => {
  if (status === "Success") return <Badge className="bg-green-500 text-white">Success</Badge>;
  if (status === "Pending") return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
  return <Badge className="bg-red-500 text-white">Failed</Badge>;
};

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">Transactions</h1>
      <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">View all your ticket purchases and earnings in one place.</p>

      <div className="bg-gray-900 p-3 md:p-4 rounded-lg overflow-x-auto -mx-4 md:mx-0">
        <table className="min-w-full text-white text-sm md:text-base">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-2 text-xs md:text-sm">Date</th>
              <th className="p-2 text-xs md:text-sm">Event</th>
              <th className="p-2 text-xs md:text-sm">Amount</th>
              <th className="p-2 text-xs md:text-sm">Status</th>
              <th className="p-2 text-xs md:text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-800">
                <td className="p-2 text-xs md:text-sm">{tx.date}</td>
                <td className="p-2 text-xs md:text-sm">{tx.event}</td>
                <td className="p-2 text-xs md:text-sm">{tx.amount}</td>
                <td className="p-2 text-xs md:text-sm">{getStatusBadge(tx.status)}</td>
                <td className="p-2 text-xs md:text-sm">
                  <button className="flex gap-1 items-center" onClick={() => setSelectedTransaction(tx)}>
                    <Eye size={14} className="text-xs" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 p-4 md:p-6 rounded-md w-full max-w-xs md:max-w-sm text-white">
            <h2 className="text-lg font-bold mb-3">Transaction Details</h2>
            <p><strong>Event:</strong> {selectedTransaction.event}</p>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
            <p><strong>Status:</strong> {selectedTransaction.status}</p>
            <p className="truncate"><strong>Transaction ID:</strong> {`0x${Math.random().toString(16).slice(2, 10)}`}</p>
            <Button className="mt-4 w-full bg-blue-500 text-sm">
              <Download size={16} className="mr-2" /> Download Receipt
            </Button>
            <Button className="mt-2 w-full bg-red-500 text-sm" onClick={() => setSelectedTransaction(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
