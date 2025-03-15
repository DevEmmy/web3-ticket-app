"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

  if (loading) return <p className="text-white text-center py-10 pt-28">Loading event details...</p>;
  if (!event) return <p className="text-white text-center py-10 pt-28">Event not found.</p>;

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
    <div className="min-h-screen text-white py-32 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Event Image and Details Container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Event Image */}
          <div className="lg:col-span-3 relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden">
            <img
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwBzcQt2uI-BHaUOo6zucN86WDdD75pOVmw&s"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details - Right Side on Desktop */}
          <div className="lg:col-span-2 flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{event.title}</h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">{event.category} - {event.location}</p>

            {/* Date and Time */}
            <div className="mt-4 border-l-4 border-primary pl-4">
              <h3 className="text-lg md:text-xl font-semibold">Date & Time</h3>
              <p className="text-gray-300">{new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>

            {/* Ticket Purchase Section */}
            <div className="mt-6 bg-gray-900 p-4 rounded-lg flex flex-col justify-between h-auto">
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Price: {event.price ? `${event.price} SOL` : "Free"}
                </p>
                {event.mintAsNFT && <p className="text-sm text-blue-400 mt-1">NFT Ticket Available</p>}
              </div>

              <Button
                onClick={handlePurchase}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Get Ticket"}
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section - Full Width Below */}
        <div className="mt-8 lg:mt-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Event Details</h2>
          <div className="bg-gray-900/50 rounded-lg p-5 text-gray-300 text-sm md:text-base">
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
