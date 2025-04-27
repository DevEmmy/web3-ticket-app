"use client";
import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEventTicketing } from '@/hooks/useEventTicketing';


export const EventList: FC = () => {
  const { publicKey } = useWallet();
  const { 
    events, 
    myTickets,
    isLoading, 
    error, 
    bookTicket,
    userProfilePubkey
  } = useEventTicketing();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBookTicket = async (eventPubkey: any) => {
    if (!publicKey || !userProfilePubkey) {
      alert('Please connect your wallet and register first');
      return;
    }
    
    await bookTicket(eventPubkey, userProfilePubkey);
  };

  if (!publicKey) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Solana Event Ticketing</h1>
        <div className="mb-8">
          <p className="mb-4">Connect your wallet to see available events</p>
          <div className="flex justify-center">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Available Events</h1>
      
      {events.length === 0 ? (
        <p>No events available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div 
              key={event.publicKey.toString()}
              className="border p-4 rounded-lg hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{event.account.name}</h2>
              <p className="text-gray-600">{event.account.description}</p>
              <p className="mt-2">
                <span className="font-medium">Date:</span>{' '}
                {new Date(event.account.date * 1000).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Price:</span>{' '}
                {event.account.ticketPrice.toString()} SOL
              </p>
              <p>
                <span className="font-medium">Available:</span>{' '}
                {(event.account.totalTickets - event.account.ticketsSold).toString()}/{event.account.totalTickets.toString()}
              </p>
              
              <button
                onClick={() => handleBookTicket(event.publicKey.toString())}
                disabled={event.account.ticketsSold >= event.account.totalTickets}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Book Ticket
              </button>
            </div>
          ))}
        </div>
      )}
      
      {myTickets.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">My Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myTickets.map((ticket) => (
              <div 
                key={ticket.publicKey.toString()}
                className="border p-4 rounded-lg bg-green-500"
              >
                <h3 className="font-semibold">Ticket #{ticket.publicKey.toString().slice(0, 8)}</h3>
                <p>Event: {ticket.account.event.toString().slice(0, 8)}...</p>
                <p>Purchased: {new Date(ticket.account.purchaseDate * 1000).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};