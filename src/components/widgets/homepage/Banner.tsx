"use client"

import Button from '@/components/ui/Button';
import { motion } from "framer-motion";
import styles from '@/components/styles';
import { staggerContainer, textVariant } from "@/components/utils/motion";
import { useRouter } from 'next/navigation';

const Banner = () => {
  const Router = useRouter();

  if (!staggerContainer || !textVariant) {
    console.error('Motion variants are undefined');
    return null;
  }

  return (
    <div className='flex items-center justify-center w-full pt-[90px]'>
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex flex-col justify-center items-center text-center gap-5">
          <motion.h2 
            variants={textVariant(1.1)}
            className='text-[50px] font-bold'
          >
            Next-Gen Ticketing:<br/> Secure, Fast & Decentralized
          </motion.h2>
          
          <motion.p 
            variants={textVariant(1.2)}
            className='text-[20px] max-w-[720px] text-lightGray'
          >
            No more fake tickets! Your event passes are minted on the blockchain, ensuring authenticity and easy transfers.
          </motion.p>
          
          <motion.div variants={textVariant(1.3)}>
            <Button onClick={() => Router.push("/events")} className='bg-primary font-bold'>Get a Ticket</Button>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Banner;