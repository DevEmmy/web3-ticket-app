import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-[#222] p-5 rounded-xl flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#9945FF]">
      <Icon size={30} className="text-blue-400" />
      <div>
        <h2 className="text-gray-400 text-sm">{title}</h2>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
