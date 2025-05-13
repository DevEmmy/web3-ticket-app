import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";

interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerUrl: string;
  venue?: {
    name: string;
    city: string;
    country: string;
  };
  ticketTiers: Array<{
    price: number;
  }>;
}

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async (): Promise<Event[]> => {
      const response = await axiosInstance.get('/events');
      return response.data.data;
    }
  });
};
