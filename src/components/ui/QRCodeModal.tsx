import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string;
  ticketDetails: {
    eventName: string;
    ticketId: string;
    ticketType: string;
  };
}

export const QRCodeModal = ({ isOpen, onClose, qrCodeUrl, ticketDetails }: QRCodeModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 rounded-lg max-w-sm w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-white">
              Ticket QR Code
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64 rounded-lg mb-4" />
            <h3 className="text-white font-medium">{ticketDetails.eventName}</h3>
            <p className="text-gray-400 text-sm">{ticketDetails.ticketType}</p>
            <p className="text-gray-400 text-sm mt-1">ID: {ticketDetails.ticketId}</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
