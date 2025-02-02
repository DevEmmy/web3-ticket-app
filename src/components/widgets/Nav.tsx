import Link from "next/link";
import React from "react";

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
  return (
    <div className="font-spaceGrotesk py-5 flex items-center justify-between text-[18px]">
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
        <Link href="/login" className="border-2 border-primary px-10 py-3 rounded-full  text-right w-fit">
          Connect Wallet
        </Link>
      </div>
    </div>
  );
};

export default Nav;
