"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { toast } from 'react-hot-toast';
import FloatingBalls from '@/components/widgets/FloatingBalls';
import axiosInstance from '@/utils/axiosConfig';
import { toastError, toastSuccess } from '@/utils/toast';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement your waitlist submission logic heretlist, { email }
      const response = await axiosInstance.post("/waitlist/join", {email});
      setEmail('');
      toastSuccess("Thanks for joining our wailist")
    } catch (error: any) {
      console.log(error)
      toastError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* <AnimatedBackground /> */}
      <FloatingBalls />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join the Future of Event Ticketing
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Be among the first to experience our revolutionary Web3 ticketing platform.
            Secure your spot on our waitlist today!
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-gray-400"
          >
            <p className="text-sm">
              By joining our waitlist, you'll be the first to know when we launch.
              We'll never spam you or share your email.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 