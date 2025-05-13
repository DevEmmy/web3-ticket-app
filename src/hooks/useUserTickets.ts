import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  imageUrl: string;
}

interface Ticket {
  _id: string;
  event: Event;
  walletAddress: string;
  ticketType: string;
  qrCodeUrl: string | null;
  minted: boolean;
  isUsed: boolean;
  createdAt: string;
  ticketId: string;
}

export const useUserTickets = () => {
  return useQuery({
    queryKey: ['userTickets'],
    queryFn: async (): Promise<Ticket[]> => {
      const response = await axiosInstance.get('/tickets');
      return response.data.data;
    }
  });
};
