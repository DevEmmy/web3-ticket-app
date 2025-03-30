"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';

const EventCard: React.FC = () => {
  return (
    <motion.div 
      className='flex flex-col gap-3 p-4 w-full border rounded-3xl border-primary bg-black overflow-hidden'
      initial={{ opacity: 0.9 }}
      whileHover={{ 
        scale: 1.02,
        borderColor: '#9333ea',
        boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex gap-2 -mt-1 mb-1">
        <motion.span 
          className="bg-primary text-white text-sm py-1 px-3 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          Solana
        </motion.span>
        <motion.span 
          className="bg-gray-600 text-white text-sm py-1 px-3 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          NFT
        </motion.span>
      </div>
      
      <motion.div 
        className="relative w-full h-48 rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <Image 
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwBzcQt2uI-BHaUOo6zucN86WDdD75pOVmw&s"} 
          alt='Event Image' 
          layout="fill"
          objectFit="cover"
          className='transition-all duration-500 hover:scale-110'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </motion.div>
      
      <motion.h2 
        className='text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent'
        whileHover={{ scale: 1.01 }}
      >
        Solana Event 2025
      </motion.h2>
      
      <div className="flex flex-col gap-2 text-gray-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <p className="text-sm">Sans Francisco</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <p className="text-sm">January 25, Wednesday</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <p className="text-sm">9PM WAT</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-green-400" />
          <p className="text-green-400 font-semibold">Free</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <Users className="w-4 h-4 text-gray-400" />
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-black"></div>
          ))}
        </div>
        <p className="text-xs text-gray-400">+496 attending</p>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <button className='w-full text-center font-bold rounded-lg py-2 bg-primary hover:bg-purple-600 transition-colors duration-300'>
          Get Ticket
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;