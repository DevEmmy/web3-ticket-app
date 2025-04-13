import { Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../idl/ticket_program.json';

export interface UserProfile {
  wallet: PublicKey;
  username: string;
  tickets: PublicKey[];
}

export interface TicketProgram extends Program {
  account: {
    userProfile: {
      fetch: (publicKey: PublicKey) => Promise<UserProfile>;
    };
  };
  methods: {
    registerUser: (username: string) => {
      accounts: (accounts: {
        userProfile: PublicKey;
        authority: PublicKey;
        systemProgram: PublicKey;
      }) => {
        rpc: () => Promise<string>;
      };
    };
  };
}

export const PROGRAM_ID = new PublicKey(idl.metadata.address); 