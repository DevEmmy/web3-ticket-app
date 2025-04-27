"use client";
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden
// require('@solana/wallet-adapter-react-ui/styles.css');
import '@solana/wallet-adapter-react-ui/styles.css';
import { useEventTicketing } from '@/hooks/useEventTicketing';

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], [network]);

  const { connected, publicKey } = useWallet();
  const { registerUser } = useEventTicketing(); // Assuming you have a registerUser function in your hook

  useEffect(() => {
    const handleRegister = async () => {
      if (publicKey) {
        console.log("Wallet connected. Attempting to register...");
        await registerUser();
      }
      else{
        console.log("no pk")
      }
    };

    handleRegister();
  }, [ publicKey]);


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};