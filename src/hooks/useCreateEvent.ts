import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import { useRouter } from 'next/navigation';

interface EventFormData {
  name: string;
  description: string;
  category: string;
  tags: string;
  startDate: string;
  endDate: string;
  timezone: string;
  eventType: string;
  venue?: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  onlineUrl?: string;
  ticketTiers: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  isFree: boolean;
  bannerUrl: string;
  socialLinks: {
    twitter?: string;
    discord?: string;
    telegram?: string;
    website?: string;
  };
}

export const useCreateEvent = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (eventData: EventFormData) => {
      const response = await axiosInstance.post('/events', eventData);
      return response.data;
    },
    onSuccess: (data) => {
        //toast
    //   router.push(`/events/${data.id}`);
    },
  });

  return {
    createEvent: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
