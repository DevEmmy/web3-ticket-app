"use client"
import { FC, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AnchorProvider as AnchorProviderType, web3, Idl } from '@coral-xyz/anchor';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import idl from '../idl/ticket_program.json';
import { AnchorProvider, Program } from '@project-serum/anchor';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface AnchorContextType {
  program: Program | null;
  isInitialized: boolean;
  error: string | null;
  isLoading: boolean;
  userProfile: {
    wallet: PublicKey;
    username: string;
    tickets: PublicKey[];
  } | null;
}

const AnchorContext = createContext<AnchorContextType>({
  program: null,
  isInitialized: false,
  error: null,
  isLoading: false,
  userProfile: null,
});


interface AnchorProviderProps {
  children: ReactNode;
}

export const AnchorLayoutProvider: FC<AnchorProviderProps> = ({ children }: ReactNode) => {
  const { wallet, publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<AnchorContextType['userProfile']>(null);

  const PROGRAM_ID = new PublicKey(idl.metadata.address);
  // Create program instance
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new AnchorProvider(connection, anchorWallet, AnchorProviderType.defaultOptions());
      return new Program(idl as any, PROGRAM_ID, provider);
    }
    return null;
  }, [anchorWallet, connection]);

  console.log(program, "program ")

  useEffect(() => {
    if (!program || !publicKey) {
      setIsInitialized(false);
      setError(null);
      setUserProfile(null);
      return;
    }

    // const initializeUser = async () => {
    //   setIsLoading(true);
    //   setError(null);

    //   try {
    //     // Find the user profile PDA
    //     const [userProfilePda] = PublicKey.findProgramAddressSync(
    //       [Buffer.from('user_profile'), publicKey.toBuffer()],
    //       program.programId
    //     );

    //     try {
    //       // Check if user is already registered
    //       const userProfileInfo = await program.account.userProfile.fetch(userProfilePda);
    //       if (userProfileInfo) {
    //         setUserProfile({
    //           wallet: userProfileInfo.wallet,
    //           username: userProfileInfo.username,
    //           tickets: userProfileInfo.tickets,
    //         });
    //         setIsInitialized(true);
    //         return;
    //       }
    //     } catch (e) {
    //       // Account doesn't exist, proceed with registration
    //       console.log("User profile not found, proceeding with registration");
    //     }

    //     // Register user with a default username
    //     const username = `user_${publicKey.toString().slice(0, 8)}`;
    //     const tx = await program.methods
    //       .registerUser(username)
    //       .accounts({
    //         userProfile: userProfilePda,
    //         authority: publicKey,
    //         systemProgram: SystemProgram.programId,
    //       })
    //       .rpc();

    //     console.log("Transaction signature:", tx);

    //     // Fetch the newly created user profile
    //     const newUserProfile = await program.account.userProfile.fetch(userProfilePda);
    //     setUserProfile({
    //       wallet: newUserProfile.wallet,
    //       username: newUserProfile.username,
    //       tickets: newUserProfile.tickets,
    //     });
    //     console.log("newUserProfile", newUserProfile)
    //     setIsInitialized(true);
    //   } catch (error) {
    //     console.error('Error initializing user:', error);
    //     setError(error instanceof Error ? error.message : 'Failed to initialize user');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // initializeUser();
  }, [program, publicKey]);

    //  const { authenticate, isAuthenticating } = useWalletAuth();
    //   const { user } = useAuthStore();
      
    //   useEffect(() => {
    //     if (publicKey && !user) {
    //       console.log("auth")
    //       authenticate();
    //     }
    //     console.log("user", user)
    //   }, [publicKey, user, authenticate]);

  return (
    <AnchorContext.Provider value={{ program, isInitialized, error, isLoading, userProfile }}>
      {children}
    </AnchorContext.Provider>
  );
};

export const useAnchor = () => useContext(AnchorContext); 