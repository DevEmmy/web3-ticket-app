"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const eventCategories = [
  "Music & Concerts",
  "Sports & Fitness",
  "Conferences & Seminars",
  "Workshops & Training",
  "Festivals & Fairs",
  "Networking & Meetups",
  "Art & Exhibitions",
  "Technology & Hackathons",
  "Food & Drink",
  "Comedy & Stand-up",
  "Theater & Performing Arts",
];

const CategoryScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden p-4 hide-scrollbar">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {eventCategories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer transition-transform duration-300"
          >
            {category}
          </motion.div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-lg transition hover:bg-white/20"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
};

export default CategoryScroll;
