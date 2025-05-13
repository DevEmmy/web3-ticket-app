import { Program, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../idl/ticket_program.json';

export interface UserProfile {
  wallet: PublicKey;
  username: string;
  tickets: PublicKey[];
}

export type TicketProgram = Program<Idl>;

export const PROGRAM_ID = new PublicKey(idl.metadata.address); 