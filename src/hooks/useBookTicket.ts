import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";

interface BookTicketPayload {
  eventId: string;
  type: string;
}

export const useBookTicket = () => {
  return useMutation({
    mutationFn: async (data: BookTicketPayload) => {
      const response = await axiosInstance.post('/events/purchase', data);
      return response.data;
    }
  });
};
