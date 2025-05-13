import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerUrl: string;
  category: string;
  venue?: {
    name: string;
    city: string;
    country: string;
  };
  ticketTiers: Array<{
    price: number;
    name: string;
    quantity: number;
  }>;
  organizer: string;
  mintAsNFT?: boolean;
}

export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async (): Promise<Event> => {
      const response = await axiosInstance.get(`/events/${eventId}`);
      return response.data.data;
    },
    enabled: !!eventId
  });
};
