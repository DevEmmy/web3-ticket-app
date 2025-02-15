"use client";
import Link from "next/link";
import React from "react";
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Button from "../ui/Button";
import WalletFormatter from "../utils/wallet-formatter";

const Nav = () => {
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

  const {publicKey, connect, disconnect} = useWallet();
  return (
    <div className="font-spaceGrotesk py-5 flex items-center justify-between text-[18px] mx-[5%]">
      <div className="flex items-center gap-0 flex-1">
        {navItems.map((item, i) => {
          return (
            <div key={i}>
              <Link href={item.link}>{item.title}</Link>

              {i !== navItems.length - 1 && (
                <span className="px-5 text-primary">/</span>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="flex-1 text-center">EventFi</h2>

      <div className="flex-1 flex justify-end cursor-pointer">
        {publicKey ? (
          <Button onClick={() => disconnect()}><WalletFormatter publicKey={publicKey.toString()} /></Button>
        ) : (
          <WalletMultiButton />
        )}
      </div>
    </div>
  );
};

export default Nav;
