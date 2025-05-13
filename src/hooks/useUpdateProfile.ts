import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import { useAuthStore } from "@/store/useAuthStore";

interface ProfileData {
  username?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  bio?: string;
  website?: string;
  profileImage?: string;
}

export const useUpdateProfile = () => {
  const { user, setAuth } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async (data: ProfileData) => {
      const response = await axiosInstance.patch(`/users/${user?._id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Update the auth store with the new user data
      setAuth(useAuthStore.getState().token!, data.data);
    },
  });

  return {
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
