// src/hooks/useEventTicketing.ts
import { useEffect, useState } from 'react';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import { EventTicketingClient } from '../utils/eventTicketing';

export const useEventTicketing = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const { publicKey } = useWallet();
  const [client, setClient] = useState<EventTicketingClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);

  // Initialize client when wallet connects
  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(
        connection, 
        wallet,
        { commitment: 'processed' }
      );
      const eventClient = new EventTicketingClient(provider);
      setClient(eventClient);
    } else {
      setClient(null);
    }
  }, [connection, wallet]);

  // Load data when client is available
  useEffect(() => {
    if (client && publicKey) {
      loadEvents();
      loadMyEvents();
      loadMyTickets();
    }
  }, [client, publicKey]);

  // Load all events
  const loadEvents = async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      const allEvents: any = await client.getAllEvents();
      setEvents(allEvents);
      setError(null);
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  // Load user's events
  const loadMyEvents = async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      const userEvents: any = await client.getMyEvents();
      setMyEvents(userEvents);
      setError(null);
    } catch (err) {
      console.error('Error loading your events:', err);
      setError('Failed to load your events');
    } finally {
      setIsLoading(false);
    }
  };

  // Load user's tickets
  const loadMyTickets = async () => {
    if (!client) return;
    
    try {
      setIsLoading(true);
      const userTickets : any= await client.getMyTickets();
      setMyTickets(userTickets);
      setError(null);
    } catch (err) {
      console.error('Error loading your tickets:', err);
      setError('Failed to load your tickets');
    } finally {
      setIsLoading(false);
    }
  };

  // Register a new user
  const registerUser = async () => {
    if (!client) return null;
    let username =  "0xuser_" + Math.floor(Math.random() * 100000);
    try {
      setIsLoading(true);
      const userProfilePubkey = await client.registerUser(username);
      setError(null);
      return userProfilePubkey;
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register user');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new event
  const createEvent = async (name: string, description: string, date: number, price: number, totalTickets: number) => {
    if (!client) return null;
    
    try {
      setIsLoading(true);
      const eventPubkey = await client.createEvent(name, description, date, price, totalTickets);
      await loadMyEvents(); // Refresh events list
      setError(null);
      return eventPubkey;
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Book a ticket
  const bookTicket = async (eventPubkey: string, userProfilePubkey: string) => {
    if (!client) return null;
    
    try {
      setIsLoading(true);
      const ticketPubkey = await client.bookTicket(eventPubkey, userProfilePubkey);
      await loadMyTickets(); // Refresh tickets list
      setError(null);
      return ticketPubkey;
    } catch (err) {
      console.error('Error booking ticket:', err);
      setError('Failed to book ticket');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an event
  const updateEvent = async (eventPubkey: string, name?: string, description?: string, date?: number, price?: number) => {
    if (!client) return false;
    
    try {
      setIsLoading(true);
      await client.updateEvent(eventPubkey, name, description, date, price);
      await loadMyEvents(); // Refresh events list
      setError(null);
      return true;
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel an event
  const cancelEvent = async (eventPubkey: string) => {
    if (!client) return false;
    
    try {
      setIsLoading(true);
      await client.cancelEvent(eventPubkey);
      await loadMyEvents(); // Refresh events list
      setError(null);
      return true;
    } catch (err) {
      console.error('Error canceling event:', err);
      setError('Failed to cancel event');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    events,
    myEvents,
    myTickets,
    registerUser,
    createEvent,
    bookTicket,
    updateEvent,
    cancelEvent,
    loadEvents,
    loadMyEvents,
    loadMyTickets,
    isConnected: !!publicKey,
    wallet: publicKey?.toString(),
    userProfilePubkey: publicKey ? publicKey.toString() : null,
  };
};