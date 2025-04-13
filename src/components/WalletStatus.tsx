"use client"
import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAnchor } from '@/context/AnchorProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const WalletStatus: FC = () => {
  const { connected } = useWallet();
  const { isInitialized, error, isLoading } = useAnchor();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <WalletMultiButton />
      
      {connected && (
        <div className="text-center">
          {isLoading ? (
            <div className="text-yellow-500">Initializing program...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : isInitialized ? (
            <div className="text-green-500">Successfully registered!</div>
          ) : (
            <div className="text-yellow-500">Connecting to program...</div>
          )}
        </div>
      )}
    </div>
  );
}; 