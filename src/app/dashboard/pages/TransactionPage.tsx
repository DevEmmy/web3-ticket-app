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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Transactions</h1>
      <p className="text-gray-400 mb-6">View all your ticket purchases and earnings in one place.</p>

      <div className="bg-gray-900 p-4 rounded-lg">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-2">Date</th>
              <th className="p-2">Event</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-800">
                <td className="p-2">{tx.date}</td>
                <td className="p-2">{tx.event}</td>
                <td className="p-2">{tx.amount}</td>
                <td className="p-2">{getStatusBadge(tx.status)}</td>
                <td className="p-2">
                  <button className="flex gap-2 items-center" onClick={() => setSelectedTransaction(tx)}>
                    <Eye size={16} className="text-sm" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-md w-96 text-white">
            <h2 className="text-lg font-bold mb-3">Transaction Details</h2>
            <p><strong>Event:</strong> {selectedTransaction.event}</p>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
            <p><strong>Status:</strong> {selectedTransaction.status}</p>
            <p><strong>Transaction ID:</strong> {`0x${Math.random().toString(16).slice(2, 10)}`}</p>
            <Button className="mt-4 w-full bg-blue-500">
              <Download size={16} className="mr-2" /> Download Receipt
            </Button>
            <Button className="mt-2 w-full bg-red-500" onClick={() => setSelectedTransaction(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
