import React from "react";

interface RentalCardProps {
  title: string;
  description: string;
  buttonText: string;
  index: number;
}

const RentalCard: React.FC<RentalCardProps> = ({ title, description, buttonText, index }) => {
  return (
    <div className="bg-black border border-primary rounded-xl shadow-lg overflow-hidden w-full">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-center text-white rounded-t-xl relative">
        <span className="bg-white text-purple-500 font-bold px-4 py-2 rounded-full absolute top-4 left-4">
          {index}
        </span>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <button className="mt-4 px-4 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-100 transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default RentalCard;
