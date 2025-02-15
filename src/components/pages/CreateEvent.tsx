"use client"
import { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState<{
    name: string;
    description: string;
    category: string;
    date: string;
    time: string;
    location: string;
    price: string;
    image: File | null; // Allow File or null
    mintAsNFT: boolean;
  }>({
    name: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    image:  null,
    mintAsNFT: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventData({ ...eventData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
  };

  return (
    <div className="p-6 w-3/4 mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Create New Event</h1>

      <form onSubmit={handleSubmit} className=" bg-gray-800 p-6 rounded-lg grid grid-cols-2 gap items-start gap-5">
        {/* Event Name */}
        <div className="w-full">
          <label className="block text-white">Event Name</label>
          <input type="text" name="name" value={eventData.name} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
        </div>


        {/* Category */}
        <div className="w-full">
          <label className="block text-white">Category</label>
          <select name="category" value={eventData.category} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded">
            <option value="">Select Category</option>
            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="gap-5 col-span-2 grid grid-cols-3">
          <div>
            <label className="block text-white">Date</label>
            <input type="date" name="date" value={eventData.date} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
          </div>

          <div>
            <label className="block text-white">Time</label>
            <input type="time" name="time" value={eventData.time} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
          </div>

          {/* Location */}
        <div>
          <label className="block text-white">Location</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
        </div>
        </div>

        

        {/* Ticket Pricing */}
        <div>
          <label className="block text-white">Ticket Price (Leave blank if free)</label>
          <input type="number" name="price" value={eventData.price} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-white">Event Image</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-white">Description</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
        </div>

        {/* Mint as NFT */}
        <div className="flex items-center col-span-2">
          <input type="checkbox" checked={eventData.mintAsNFT} onChange={() => setEventData({ ...eventData, mintAsNFT: !eventData.mintAsNFT })} />
          <label className="ml-2 text-white">Mint Tickets as NFTs</label>
        </div>

        <button type="submit" className="col-span-2 bg-primary px-4 py-2 rounded text-white w-full">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
