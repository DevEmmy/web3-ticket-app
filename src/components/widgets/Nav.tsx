"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Button from "../ui/Button";
import WalletFormatter from "../utils/wallet-formatter";
import { Menu, X } from "lucide-react";

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
      link: "/",
    },
    {
      title: "About Us",
      link: "/",
    },
  ];

  const { publicKey, connect, disconnect } = useWallet();

  return (
    <div className={`font-spaceGrotesk py-5 fixed top-0 left-0 w-full z-[999] mb-[80px] transition-shadow ${isScrolled ? 'shadow-md bg-background/90' : ''}`}>
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between text-[18px] mx-[5%]">
        <div className="flex items-center gap-0 flex-1">
          {navItems.map((item, i) => {
            return (
              <div key={i}>
                <Link href={item.link} className="hover:text-primary transition-colors">{item.title}</Link>

                {i !== navItems.length - 1 && (
                  <span className="px-5 text-primary">/</span>
                )}
              </div>
            );
          })}
        </div>

        <Link href="/" className="flex-1 text-center">
          <h2 className="text-xl font-bold">EventFi</h2>
        </Link>

        <div className="flex-1 flex justify-end cursor-pointer">
          {publicKey ? (
            <Button onClick={() => disconnect()}><WalletFormatter publicKey={publicKey.toString()} /></Button>
          ) : (
            <WalletMultiButton />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between mx-[5%]">
        <Link href="/">
          <h2 className="text-xl font-bold">EventFi</h2>
        </Link>

        <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} className="text-primary transition-all duration-200" /> : <Menu size={24} className="transition-all duration-200" />}
        </button>
      </div>

      {/* Dropdown */}
      <div
        className={`lg:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg z-10 border-t transition-all duration-300 overflow-hidden ${isMenuOpen
          ? 'opacity-100 max-h-[400px] py-4 px-[5%]'
          : 'opacity-0 max-h-0 py-0 px-[5%]'
          }`}
        style={{ top: "100%" }}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          <div className="pt-4 pb-2">
            {publicKey ? (
              <Button onClick={() => disconnect()} className="w-full justify-center">
                <WalletFormatter publicKey={publicKey.toString()} />
              </Button>
            ) : (
              <div className="flex justify-center">
                <WalletMultiButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;