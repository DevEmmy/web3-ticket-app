"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Button from "../ui/Button";
import WalletFormatter from "../utils/wallet-formatter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.5
};

const logoVariants = {
  initial: {
    backgroundPosition: "0% 50%",
    textShadow: "0px 0px 0px rgba(104, 58, 183, 0)"
  },
  hover: {
    backgroundPosition: "100% 50%",
    textShadow: "0px 0px 8px rgba(104, 58, 183, 0.3)",
    backgroundSize: "200% 200%",
    transition: {
      backgroundPosition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      },
      ...springTransition
    }
  }
};

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const navItems = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Get a Ticket",
      link: "/events",
    },
    {
      title: "Rentals",
      link: "/rentals",
    },
    {
      title: "About Us",
      link: "/about",
    },
  ];

  const { publicKey, connect, disconnect } = useWallet();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        ...springTransition,
        duration: 0.8
      }}
      className={`font-spaceGrotesk py-5 fixed top-0 left-0 w-screen sm:w-full z-[999] mb-[80px] transition-all duration-500 
        ${isScrolled 
          ? 'shadow-md bg-transparent/70 backdrop-blur-lg before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black before:via-black/10 before:to-transparent before:h-full before:pointer-events-none' 
          : 'bg-transparent backdrop-blur-sm'
        }`}
      
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between mx-[5%]">
        <Link href="/" className="flex-1 text-center">
        <div className="text-2xl font-semibold tracking-wide flex items-center gap-2">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            EventFi
          </span>
        </div>
        </Link>
        <div className="flex items-center gap-0 text-[13px] flex-2">
          {navItems.map((item, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                <Link href={item.link} className="hover:text-primary transition-colors duration-300">{item.title}</Link>

                {i !== navItems.length - 1 && (
                  <span className="px-5 text-primary">/</span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex-1 flex justify-end cursor-pointer">
          {publicKey ? (
            <Button className="w-[210px] h-10  flex text-[13px] items-center" onClick={() => disconnect()}><WalletFormatter publicKey={publicKey.toString()} /></Button>
          ) : (
            <WalletMultiButton />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between mx-[5%] w-auto">
        <Link href="/">
          <motion.h2
            className="text-xl font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
          >
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            EventFi
          </span>
          </motion.h2>
        </Link>

        <motion.button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          transition={springTransition}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" }
            }}
            className="lg:hidden absolute w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-10 border-t"
            style={{ top: "100%" }}
          >
            <div className="flex flex-col space-y-4 py-4 px-[5%]">
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    x: { ...springTransition, delay: i * 0.1 },
                    opacity: { duration: 0.2, delay: i * 0.1 }
                  }}
                >
                  <Link
                    href={item.link}
                    className="py-2 hover:text-primary transition-colors duration-300 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="pt-4 pb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                  y: { ...springTransition, delay: 0.4 },
                  opacity: { duration: 0.2, delay: 0.4 }
                }}
              >
                {publicKey ? (
                  <Button onClick={() => disconnect()} className="w-full justify-center">
                    <WalletFormatter publicKey={publicKey.toString()} />
                  </Button>
                ) : (
                  <div className="flex justify-center">
                    <WalletMultiButton />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Nav;