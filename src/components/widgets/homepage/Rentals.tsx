"use client";
import React from "react";
import RentalCard from "@/components/ui/RentalCard";
import { useRouter } from "next/navigation";

const rentalItems = [
  {
    title: "Sound Systems",
    description: "Professional sound systems available for your next event. Secure with smart contracts.",
    buttonText: "View Equipment",
  },
  {
    title: "Lighting Equipment",
    description: "Professional lighting equipment available for your next event. Secure with smart contracts.",
    buttonText: "View Equipment",
  },
  {
    title: "Stage Setup",
    description: "Professional stage setup available for your next event. Secure with smart contracts.",
    buttonText: "View Equipment",
  },
];

const RentalsSection: React.FC = () => {
  const Router = useRouter();
  return (
    <section className="py-7">
        <h2 className="text-3xl font-bold mb-6">Rent Event Equipment</h2>
      <div className="mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-5 r">
          {rentalItems.map((item, index) => (
            <RentalCard key={index} {...item} index={index + 1} />
          ))}
        </div>
      </div>
      <button onClick={() => Router.push('/rentals')} className="bg-primary rounded-lg p-2 mt-5">See more</button>
    </section>
  );
};

export default RentalsSection;
