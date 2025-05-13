"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { Dialog } from "@headlessui/react";
import { useEvent } from "@/hooks/useEvent";
import { toastError, toastSuccess } from "@/utils/toast";
import { useBookTicket } from "@/hooks/useBookTicket";

export default function EventDetails() {
  const { slug } = useParams();
  const { publicKey, sendTransaction } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);

  const { data: event, isLoading, error } = useEvent(slug as string);
  const { mutate: bookTicket, isPending } = useBookTicket();

  if (isLoading)
    return (
      <p className="text-white text-center py-10 pt-28">
        Loading event details...
      </p>
    );
  if (error || !event)
    return (
      <p className="text-white text-center py-10 pt-28">Event not found.</p>
    );

  const handlePurchase = async () => {
    if (!publicKey) {
      return toast.error("Connect your wallet first");
    }

    if (!selectedTier) {
      return toast.error("Please select a ticket tier.");
    }

    try {
      await bookTicket(
        {
          eventId: slug as string,
          type: selectedTier.name,
        },
        {
          onSuccess: () => {
            toastSuccess(
              `Ticket (${selectedTier.name}) purchased successfully!`
            );
            setShowModal(false);
          },
          onError: (error: any) => {
            toastError(
              error.response?.data?.message || "Failed to purchase ticket"
            );
          },
        }
      );
    } catch (err) {
      console.error(err);
      toastError("Something went wrong while processing your ticket.");
    }
  };

  return (
    <div className="min-h-screen text-white py-32 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          <div className="lg:col-span-3 relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden">
            <img
              src={event.bannerUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {event.name}
            </h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
              {event.category} - {event.venue?.city}, {event.venue?.country}
            </p>

            <div className="mt-4 border-l-4 border-primary pl-4">
              <h3 className="text-lg md:text-xl font-semibold">Date & Time</h3>
              <p className="text-gray-300">
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-300">
                {new Date(event.startDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
            </div>

            <div className="mt-6 bg-gray-900 p-4 rounded-lg flex flex-col justify-between h-auto">
              <div className="mb-4">
                <p className="text-lg font-semibold">Available Tickets:</p>
                {event.ticketTiers.map((tier: any, index: number) => (
                  <div
                    key={index}
                    className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{tier.name}</h4>
                      <span className="text-blue-400">{tier.price} SOL</span>
                    </div>
                    {tier.description && (
                      <p className="text-sm text-gray-400 mt-1">
                        {tier.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      {tier.quantity} tickets available
                    </p>
                    {tier.perks && tier.perks.length > 0 && (
                      <ul className="text-sm text-green-400 mt-1 list-disc list-inside">
                        {tier.perks.map((perk: string, idx: number) => (
                          <li key={idx}>{perk}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {event.mintAsNFT && (
                  <p className="text-sm text-blue-400 mt-1">
                    NFT Ticket Available
                  </p>
                )}
              </div>

              <Button
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Get Ticket
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">
            Event Details
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-5 text-gray-300 text-sm md:text-base">
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 rounded-lg max-w-md w-full p-6 text-white">
            <Dialog.Title className="text-lg font-bold">
              Purchase Ticket
            </Dialog.Title>
            <p className="text-gray-400 text-sm mt-1 mb-4">
              Choose a ticket type and confirm purchase using your wallet.
            </p>

            <div className="space-y-3">
              {event.ticketTiers.map((tier: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedTier(tier)}
                  className={`cursor-pointer border p-4 rounded-md transition-colors ${
                    selectedTier?.name === tier.name
                      ? "border-blue-500 bg-gray-800"
                      : "border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{tier.name}</span>
                    <span className="text-blue-400">{tier.price} SOL</span>
                  </div>
                  {tier.description && (
                    <p className="text-sm text-gray-400">{tier.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {tier.quantity} tickets available
                  </p>
                  {tier.perks && tier.perks.length > 0 && (
                    <ul className="text-xs text-green-400 mt-2 list-disc list-inside">
                      {tier.perks.map((perk: string, idx: number) => (
                        <li key={idx}>{perk}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handlePurchase}
                disabled={isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {isPending ? "Processing..." : `Purchase`}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
