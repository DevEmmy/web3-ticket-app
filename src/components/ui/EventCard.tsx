"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';

interface EventCardProps {
  event: {
    _id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    bannerUrl: string;
    venue?: {
      name: string;
      city: string;
      country: string;
    };
    ticketTiers: Array<{
      price: number;
    }>;
    category?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLowestPrice = () => {
    if (!event.ticketTiers.length) return 'Free';
    const lowestPrice = Math.min(...event.ticketTiers.map(tier => tier.price));
    return lowestPrice === 0 ? 'Free' : `$${lowestPrice}`;
  };

  return (
    <motion.div
      className="flex flex-col gap-3 p-4 w-full border rounded-3xl border-primary bg-black overflow-hidden"
      initial={{ opacity: 0.9 }}
      whileHover={{
        scale: 1.02,
        borderColor: "#9333ea",
        boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Category Tag */}
      {event.category && (
        <div className="flex gap-2 -mt-1 mb-1">
          <motion.span
            className="bg-primary text-white text-sm py-1 px-3 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {event.category}
          </motion.span>
        </div>
      )}

      {/* Event Image */}
      <motion.div className="relative w-full h-48 rounded-2xl overflow-hidden">
        <Image
          src={event.bannerUrl || '/placeholder-event.jpg'}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          unoptimized
          className="transition-all duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </motion.div>

      {/* Event Title */}
      <motion.h2
        className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
        whileHover={{ scale: 1.01 }}
      >
        {event.name}
      </motion.h2>

      {/* Event Details */}
      <div className="flex flex-col gap-2 text-gray-200">
        {event.venue && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <p className="text-sm">{`${event.venue.city}, ${event.venue.country}`}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <p className="text-sm">{formatDate(event.startDate)}</p>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <p className="text-sm">{formatTime(event.startDate)}</p>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-green-400" />
          <p className="text-green-400 font-semibold">From {getLowestPrice()}</p>
        </div>
      </div>

      {/* Get Ticket Button */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          onClick={() => router.push(`/events/${event._id}`)}
          className="w-full text-center font-bold rounded-lg py-2 bg-primary hover:bg-purple-600 transition-colors duration-300"
        >
          Get Ticket
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
