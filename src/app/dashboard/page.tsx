import Transactions from "@/components/widgets/dashboard/Transactions";
import UpcomingEvents from "@/components/widgets/dashboard/UpcomingEvents";
import StatsCard from "@/components/widgets/StatsCard";
import { Ticket, Wallet, Calendar } from "lucide-react";

// import Transactions from "./components/Transactions";
// import UpcomingEvents from "./components/UpcomingEvents";

export default function DashboardPage() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-400 mb-6">Track your ticket sales and events.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Tickets Sold" value="1,245" icon={Ticket} />
        <StatsCard title="Total Revenue" value="12.5 SOL" icon={Wallet} />
        <StatsCard title="Upcoming Events" value="5" icon={Calendar} />
      </div>

      {/* Transactions & Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Transactions />
        <UpcomingEvents />
      </div>
    </div>
  );
}
