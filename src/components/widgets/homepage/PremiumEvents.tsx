"use client";
import { motion } from "framer-motion";
import styles from "../../styles";
import { fadeIn, staggerContainer } from "../../utils/motion";
import NFTTicketCard from "../../ui/NftTicketCard";

const PremiumEvents = () => (
    <section
        id="contact"
        className={`${styles.paddings} ${styles.flexColLg} relative z-10 flex flex-col items-center justify-center`}
    >
        <h1 className="text-3xl font-bold">Experience Events in the <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Web3</span> Era</h1>
        <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`${styles.innerWidth} mx-auto flex lg:flex-row gap-6 flex-col`}
        >
            <motion.div
                variants={fadeIn("right", "tween", 0.2, 1)}
                className="relative flex-1 flex flex-col justify-center mt-5 items-center sm:p-6 p-2 rounded-[32px] border-[1px] border-[#6a6a6a] text-sm"
            >
                <img src="ring.svg" alt="ring" />
                <p>Own a piece of the experience with our NFT tickets. Buy, sell, and trade tickets on our marketplace, powered by Solana blockchain technology</p>
            </motion.div>
            <div className="-mt-5">
                <NFTTicketCard />
            </div>
            <motion.div
                variants={fadeIn("left", "tween", 0.2, 1)}
                className="relative flex-1 flex flex-col mt-5 justify-center items-center sm:p-6 p-2 rounded-[32px] border-[1px] border-[#6a6a6a] text-sm"
            >
                <img src="Visual (1).svg" alt="" />
                <h1>Buy tickets with Solana, collect NFT memorabilia, and connect with other attendees in a decentralized ecosystem.</h1>
            </motion.div>
        </motion.div>
    </section>
);

export default PremiumEvents;