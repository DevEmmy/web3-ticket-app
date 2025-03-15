"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

const locations = [
  "All Locations",
  "New York",
  "Los Angeles",
  "London",
  "Berlin",
  "Paris",
  "Dubai",
  "Tokyo",
];

const EventSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row items-center gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-2xl mx-auto mb-10"
    >
      {/* Search Field */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>

      {/* Location Dropdown */}
      <div className="relative w-full md:w-52">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white appearance-none"
        >
          {locations.map((location, index) => (
            <option key={index} value={location} className="bg-gray-900 text-white">
              {location}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default EventSearch;
