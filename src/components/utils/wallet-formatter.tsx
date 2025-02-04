import React from 'react';

interface WalletFormatterProps {
  publicKey: string;
}

const WalletFormatter: React.FC<WalletFormatterProps> = ({ publicKey }) => {
  const formatPublicKey = (key: string) => {
    if (key.length <= 8) return key;
    return(
        <p>
            <span className='font-[600]'>Wallet</span>: {key.slice(0, 4)}...{key.slice(-4)}
        </p>
    );
  };

  return <span>{formatPublicKey(publicKey)}</span>;
};

export default WalletFormatter;
