import React from 'react';
import { motion } from 'framer-motion';

const NFTTicketCard = () => {
  return (
    <div className="w-[380px]">
      <motion.div 
        className="w-full max-w-sm rounded-3xl bg-gray-900 p-5 border-2 border-purple-500 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
          scale: 1.02
        }}
      >
        {/* Header section */}
        <div className="flex justify-between items-center mb-6 gap-y-2">
          <div>
            <h2 className="text-white text-2xl font-bold">Web3 Summit 2025</h2>
            <p className="text-purple-400">June 15-17, 2025</p>
          </div>
          <div className="bg-purple-600 rounded-full px-4 py-1">
            <p className="text-white text-sm font-medium">NFT Ticket</p>
          </div>
        </div>
        
        {/* Ticket section */}
        <div className="bg-purple-600 rounded-xl p-8 mb-6 flex flex-col items-center justify-center">
          <p className="text-purple-300 text-sm mb-2">#0045</p>
          <p className="text-white text-xl font-bold">PREMIUM ACCESS</p>
        </div>
        
        {/* Footer section */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-400 text-sm">Current Price</p>
            <p className="text-white text-xl font-bold">45.5 SOL</p>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
            Buy Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NFTTicketCard;