import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import bs58 from "bs58";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useWalletAuth = () => {
  const { publicKey, signMessage } = useWallet();
  const { setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  const authMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey || !signMessage) throw new Error("Wallet not connected");

      const walletAddress = publicKey.toBase58();
      
      // Step 1: Get nonce
      const nonceRes = await axiosInstance.get(`/users/nonce`, {
        params: { wallet: walletAddress },
      });
      const nonce = nonceRes.data.nonce;

      // Step 2: Sign nonce
      const encodedMessage = new TextEncoder().encode(nonce);
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      // Step 3: Verify signature
      const verifyRes = await axiosInstance.post(`/users/verify`, {
        walletAddress,
        signature,
      });

      return verifyRes.data;
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if(!user.username){
        router.push("/dashboard/settings")
      }
    },
    onError: (error: any) => {
      console.error("❌ Wallet login failed", error.response?.data || error.message);
      clearAuth();
    }
  });

  return {
    authenticate: authMutation.mutate,
    isAuthenticating: authMutation.isPending,
    error: authMutation.error,
  };
};
