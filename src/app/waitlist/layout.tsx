import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Waitlist | EventFi',
  description: 'Be among the first to experience the future of event ticketing. Join our waitlist for early access to our Web3-powered ticket platform.',
  openGraph: {
    title: 'Join the Waitlist | EventFi',
    description: 'Be among the first to experience the future of event ticketing. Join our waitlist for early access to our Web3-powered ticket platform.',
    images: [
      {
        url: '/waitlist.PNG',
        width: 1200,
        height: 630,
        alt: 'EventFi Waitlist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Waitlist | EventFi',
    description: 'Be among the first to experience the future of event ticketing. Join our waitlist for early access to our Web3-powered ticket platform.',
    images: ['/waitlist.PNG'],
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ECDC4',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#FF6B6B',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
} 