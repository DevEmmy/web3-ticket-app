"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Tag, Check, X, ExternalLink, Ticket } from 'lucide-react';
import { useUserTickets } from '@/hooks/useUserTickets';
import { QRCodeModal } from '@/components/ui/QRCodeModal';

// Mock ticket data structure based on the provided interface


// Ticket type badge component
const TicketTypeBadge = ({ type }) => {
  const getBadgeColor = () => {
    switch (type.toLowerCase()) {
      case 'vip':
        return 'bg-purple-600 border-purple-300';
      case 'general':
        return 'bg-blue-600 border-blue-300';
      case 'collector':
        return 'bg-green-600 border-green-300';
      default:
        return 'bg-gray-600 border-gray-300';
    }
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getBadgeColor()} border`}>
      {type}
    </span>
  );
};

// Individual ticket card component
const TicketCard = ({ ticket }) => {
  const [showQRModal, setShowQRModal] = useState(false);
  const date = new Date(ticket.event.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-700">
        <div className="relative">
          <img src={ticket.nftMetadataUrl} alt={ticket.event.name} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 space-x-2 flex">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${ticket.isUsed ? 'bg-gray-700 text-gray-300' : 'bg-green-600 text-white'}`}>
              {ticket.isUsed ? <X size={12} /> : <Check size={12} />}
              {ticket.isUsed ? 'Used' : 'Valid'}
            </span>
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${ticket.minted ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              {ticket.minted ? <Check size={12} /> : <X size={12} />}
              {ticket.minted ? 'Minted' : 'Not Minted'}
            </span>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white">{ticket.event.name}</h3>
            <TicketTypeBadge type={ticket.ticketType} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm">{formattedDate} at {formattedTime}</span>
            </div>
            
            <div className="flex items-center text-gray-400">
              <Tag size={16} className="mr-2" />
              <span className="text-sm">{ticket.ticketId}</span>
            </div>
            
            {/* <div className="flex items-center text-gray-400">
              <Ticket size={16} className="mr-2" />
              <span className="text-sm truncate max-w-full">{ticket.walletAddress}</span>
            </div> */}
          </div>
        </div>
        
        <div className="border-t border-gray-800 p-4 flex space-x-2 bg-gray-900">
          {ticket.qrCodeUrl && (
            <button 
              onClick={() => setShowQRModal(true)}
              className="flex-1 px-4 py-2 rounded-md border border-purple-700 text-purple-500 hover:bg-purple-900 hover:text-purple-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink size={16} />
              View QR
            </button>
          )}
          <button className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-purple-700 to-blue-600 text-white hover:from-purple-600 hover:to-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm">
            View Details
          </button>
        </div>
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        qrCodeUrl={ticket.qrCodeUrl}
        ticketDetails={{
          eventName: ticket.event.name,
          ticketId: ticket.ticketId,
          ticketType: ticket.ticketType
        }}
      />
    </>
  );
};

// Main Tickets Dashboard component
export default function TicketsDashboard() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: tickets, isLoading, error } = useUserTickets();

  const filteredTickets = tickets?.filter(ticket => {
    if (filter === 'minted' && !ticket.minted) return false;
    if (filter === 'upcoming' && new Date(ticket.event.date) < new Date()) return false;
    if (filter === 'used' && !ticket.isUsed) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.event.name.toLowerCase().includes(query) ||
        ticket.ticketType.toLowerCase().includes(query) ||
        ticket.ticketId?.toLowerCase().includes(query)
      );
    }
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen  text-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  text-white p-6 flex items-center justify-center">
        <div className="text-red-500">Failed to load tickets</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-green-500 bg-clip-text text-transparent">
            My Tickets
          </h1>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search tickets..."
              className="bg-gray-900 border border-gray-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-purple-700 to-blue-600 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Filter size={16} />
            All Tickets
          </button>
          <button
            onClick={() => setFilter('minted')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              filter === 'minted' 
                ? 'bg-gradient-to-r from-purple-700 to-blue-600 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Check size={16} />
            Minted NFTs
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              filter === 'upcoming' 
                ? 'bg-gradient-to-r from-purple-700 to-blue-600 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Calendar size={16} />
            Upcoming Events
          </button>
          <button
            onClick={() => setFilter('used')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              filter === 'used' 
                ? 'bg-gradient-to-r from-purple-700 to-blue-600 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Tag size={16} />
            Used Tickets
          </button>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 border border-gray-800 rounded-lg bg-gray-900 text-gray-400">
            <Ticket size={48} className="mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No tickets found</h3>
            <p className="text-center">
              {searchQuery 
                ? "No tickets match your search criteria" 
                : "You don't have any tickets in this category yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}