"use client"
// src/pages/create-event.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEventTicketing } from '@/hooks/useEventTicketing';

export default function CreateEventPage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { createEvent, isLoading, error } = useEventTicketing();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    price: '',
    totalTickets: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const timestamp = new Date(formData.date).getTime() / 1000;
    const price = parseFloat(formData.price) * 1_000_000_000; // Convert to lamports
    
    const eventPubkey = await createEvent(
      formData.name,
      formData.description,
      timestamp,
      price,
      parseInt(formData.totalTickets)
    );
    
    if (eventPubkey) {
      router.push('/test');
    }
  };

  if (!publicKey) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
        <div className="mb-8">
          <p className="mb-4">Connect your wallet to create an event</p>
          <div className="flex justify-center">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>
      
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ticket Price (SOL)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.001"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Total Tickets</label>
          <input
            type="number"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}