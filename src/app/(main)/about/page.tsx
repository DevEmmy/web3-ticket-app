import Transactions from "@/components/widgets/dashboard/Transactions";
import UpcomingEvents from "@/components/widgets/dashboard/UpcomingEvents";
import StatsCard from "@/components/widgets/StatsCard";
import { Ticket, Wallet, Calendar } from "lucide-react";

// import Transactions from "./components/Transactions";
// import UpcomingEvents from "./components/UpcomingEvents";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-5 mt-[100px]">
      <div className="relative w-full h-[250px] rounded-[15px]">
        <img
          src={"./tech2.jfif"}
          alt="about"
          className="w-full h-full rounded-[15px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-background/60 p-5 gap-[15px] rounede-[15px]">
          <h1 className="text-xl md:text-5xl font-bold mb-2 md:mb-4">About Us</h1>
          <p className="mb-4 md:mb-6 text-sm md:text-3xl">
            Empowering Events, Connecting People, Simplifying Event Management.
          </p>
        </div>
      </div>
      <div className="w-full mt-[20px]"></div>
    </div>
  );
}
