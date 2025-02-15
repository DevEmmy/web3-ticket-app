"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";

import { toast } from "react-hot-toast";
import Button from "../ui/Button";

// Placeholder function to fetch event details (replace with API)
const fetchEventBySlug = async (slug: string) => {
  return {
    id: "1",
    title: "Solana Hackathon",
    description: "Join us for an exciting Web3 hackathon and build the future of blockchain!",
    date: "2024-10-15",
    location: "New York",
    price: 0.5, // SOL price
    image: "/images/hackathon.jpg",
    category: "Tech",
    mintAsNFT: true, // Set true if NFT minting is enabled
    organizer: "0xOrganizerWalletAddress",
  };
};

export default function EventDetails() {
  const { slug } = useParams();
  const { publicKey, sendTransaction } = useWallet();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (!slug) return;
    fetchEventBySlug(slug as string).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <p className="text-white text-center py-10">Loading event details...</p>;
  if (!event) return <p className="text-white text-center py-10">Event not found.</p>;

  // Handle ticket purchase
  const handlePurchase = async () => {
    
    if (!publicKey) {
      toast.error("Connect your wallet first!");
      console.log("Purchasing ticket...");
      return;
    }

    setIsProcessing(true);
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(event.organizer),
          lamports: event.price * 10 ** 9, // Convert SOL to lamports
        })
      );

      await sendTransaction(transaction, connection);
      toast.success("Ticket purchased successfully!");

      if (event.mintAsNFT) {
        // Simulate NFT minting (Replace with actual minting logic)
        toast.success("Minting NFT ticket...");
        setTimeout(() => {
          toast.success("NFT Ticket minted!");
        }, 3000);
      }
    } catch (error) {
      toast.error("Transaction failed!");
      console.error(error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Event Image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwBzcQt2uI-BHaUOo6zucN86WDdD75pOVmw&s"} alt={event.title} className="w-full h-[400px]" objectFit="cover" />
      </div>

      {/* Event Details */}
      <div className="max-w-5xl mx-auto mt-6">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="text-gray-400 mt-2">{event.category} - {event.location}</p>

        <div className="mt-4 text-gray-300">
          <p>{event.description}</p>
        </div>

        {/* Ticket Purchase Section */}
        <div className="mt-6 bg-gray-900 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              Price: {event.price ? `${event.price} SOL` : "Free"}
            </p>
            {event.mintAsNFT && <p className="text-sm text-blue-400">NFT Ticket Available</p>}
          </div>

          <Button 
            onClick={handlePurchase} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mt-3 md:mt-0"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Get Ticket"}
          </Button>
        </div>
      </div>
    </div>
  );
}
