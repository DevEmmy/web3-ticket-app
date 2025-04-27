// src/utils/eventTicketing.ts
import { AnchorProvider, Program, web3, utils, BN } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import idl from '../idl/ticket_program.json'; // Path to your IDL file

// Program ID from your deployed contract
const PROGRAM_ID = new PublicKey('ByuT7bBzcQu8SEpAM5V24CBudup9LFirwdxZHUGBHaBS');

export class EventTicketingClient {
  private program: Program;
  private provider: AnchorProvider;

  constructor(provider: AnchorProvider) {
    this.provider = provider;
    // @ts-ignore (IDL type issues can be fixed with proper typing)
    this.program = new Program(idl, PROGRAM_ID, provider);
  }

  /**
   * Register a new user
   */
  async registerUser(username: string): Promise<string> {
    const userProfile = Keypair.generate();
    
    const tx = await this.program.methods
      .registerUser(username)
      .accounts({
        userProfile: userProfile.publicKey,
        authority: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([userProfile])
      .rpc();
    console.log("pbkey", userProfile.publicKey.toString())
    return userProfile.publicKey.toString();
  }

  /**
   * Create a new event
   */
//   async createEvent(
//     name: string,
//     description: string,
//     date: number,
//     price: number,
//     totalTickets: number
//   ): Promise<string> {
//     const event = Keypair.generate();
//     const ticketMint = Keypair.generate();
    
//     // Derive the event authority PDA
//     const [eventAuthority, bump] = PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("event"), 
//         event.publicKey.toBuffer()
//       ],
//       PROGRAM_ID
//     );
//     try{
        
//     const tx = await this.program.methods
//       .createEvent(
//         name,
//         description,
//         new BN(date),
//         new BN(price),
//         new BN(totalTickets),
        
//       )
//       .accounts({
//         event: event.publicKey,
//         organizer: this.provider.wallet.publicKey,
//         eventAuthority: eventAuthority,
//         ticketMint: ticketMint.publicKey,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         systemProgram: SystemProgram.programId,
//         rent: SYSVAR_RENT_PUBKEY,
//       })
//       .signers([event, ticketMint])
//       .rpc();
    
//     return event.publicKey.toString();
//     }
//     catch (error) { 
//         console.error("Error creating event:", error);
//         // throw new Error("Failed to create event");
//         console.log(ticketMint.publicKey.toString());
//         console.log(eventAuthority.toString());
//         console.log(this.provider.wallet.publicKey.toString());
//     }

//   }

async createEvent(
    name: string,
    description: string,
    date: number,
    price: number,
    totalTickets: number
  ): Promise<string | undefined> {
    const event = Keypair.generate();
    const ticketMint = Keypair.generate();
    
    const [eventAuthority, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("event"), event.publicKey.toBuffer()],
      PROGRAM_ID
    );
  
    try {
      const tx = await this.program.methods
        .createEvent(
          name,
          description,
          new BN(date),
          new BN(price),
          new BN(totalTickets),
          bump // 👈 YOU MUST ADD BUMP HERE!
        )
        .accounts({
          event: event.publicKey,
          organizer: this.provider.wallet.publicKey,
          eventAuthority: eventAuthority,
          ticketMint: ticketMint.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([event, ticketMint])
        .rpc();
        
      return event.publicKey.toString();
    } catch (error) {
      console.error("Transaction error:", error);
    //   throw error;
    }
  }
  
  /**
   * Book a ticket for an event
   */
  async bookTicket(
    eventPublicKey: string, 
    userProfilePublicKey: string
  ): Promise<string> {
    const event = new PublicKey(eventPublicKey);
    const userProfile = new PublicKey(userProfilePublicKey);
    
    // Get event data to access mint and other info
    const eventAccount = await this.program.account.event.fetch(event);
    const ticketMint = new PublicKey(eventAccount.ticketMint);
    
    // Derive the event authority PDA
    const [eventAuthority] = await PublicKey.findProgramAddress(
      [
        Buffer.from("event"), 
        event.toBuffer()
      ],
      PROGRAM_ID
    );
    
    // Create ticket record for tracking
    const ticketRecord = Keypair.generate();
    
    // Get the associated token account for the user's ticket
    const ticketAccount = await utils.token.associatedAddress({
      mint: ticketMint,
      owner: this.provider.wallet.publicKey
    });
    
    const tx = await this.program.methods
      .bookTicket()
      .accounts({
        event: event,
        userProfile: "7DyC7xeo16KgaB8cpVFrXRSuEJjcwGt5zm6dqXmZacDo",
        eventAuthority: eventAuthority,
        ticketMint: ticketMint,
        ticketAccount: ticketAccount,
        ticketRecord: ticketRecord.publicKey,
        buyer: "5dUYF9SJ3aUbWvVVTsLBxkJ8eDZ9dhaMkXXz1sBDVHJ2",
        authority: "5dUYF9SJ3aUbWvVVTsLBxkJ8eDZ9dhaMkXXz1sBDVHJ2",
        organizer: new PublicKey(eventAccount.organizer),
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([ticketRecord])
      .rpc();
    
    return ticketRecord.publicKey.toString();
  }

  /**
   * Update event details (organizer only)
   */
  async updateEvent(
    eventPublicKey: string,
    name?: string,
    description?: string,
    date?: number,
    price?: number
  ): Promise<string> {
    const event = new PublicKey(eventPublicKey);
    
    const tx = await this.program.methods
      .updateEvent(
        name || null,
        description || null,
        date ? new BN(date) : null,
        price ? new BN(price) : null
      )
      .accounts({
        event: event,
        organizer: this.provider.wallet.publicKey,
      })
      .rpc();
    
    return tx;
  }

  /**
   * Cancel an event (organizer only, if no tickets sold)
   */
  async cancelEvent(eventPublicKey: string): Promise<string> {
    const event = new PublicKey(eventPublicKey);
    
    const tx = await this.program.methods
      .cancelEvent()
      .accounts({
        event: event,
        organizer: this.provider.wallet.publicKey,
      })
      .rpc();
    
    return tx;
  }

  /**
   * Fetch user profile data
   */
  async getUserProfile(userProfilePublicKey: string) {
    const userProfile = new PublicKey(userProfilePublicKey);
    return await this.program.account.userProfile.fetch(userProfile);
  }

  /**
   * Fetch event data
   */
  async getEvent(eventPublicKey: string) {
    const event = new PublicKey(eventPublicKey);
    return await this.program.account.event.fetch(event);
  }

  /**
   * Fetch all events
   */
  async getAllEvents() {
    return await this.program.account.event.all();
  }

  /**
   * Fetch all events created by current user
   */
  async getMyEvents() {
    return await this.program.account.event.all([
      {
        memcmp: {
          offset: 8, // After discriminator
          bytes: this.provider.wallet.publicKey.toBase58()
        }
      }
    ]);
  }

  /**
   * Fetch all tickets owned by current user
   */
  async getMyTickets() {
    return await this.program.account.ticketRecord.all([
      {
        memcmp: {
          offset: 8, // After discriminator
          bytes: this.provider.wallet.publicKey.toBase58()
        }
      }
    ]);
  }
}