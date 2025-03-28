"use client";

import Button from "@/components/ui/Button";

export default function AboutPage() {
  const Choose = [
    {
      img: "./seamless2.jfif",
      title: "Seamless Event Creation",
      desc: "Easily plan and organize events with intuitive tools.",
    },
    {
      img: "./nft1.jfif",
      title: "NFT Ticketing",
      desc: "Bring your events into the future with digital ticketing solutions",
    },
    {
      img: "./seamless2.jfif",
      title: "Customizable Options",
      desc: "Tailor events to your specific needs with various categories and features.",
    },
    {
      img: "./seamless2.jfif",
      title: "Real-Time Analytics",
      desc: "Stay informed with insights on ticket sales and attendee engagement.",
    },
    {
      img: "./seamless2.jfif",
      title: "User-Friendly Interface",
      desc: "Navigate effortlessly with a design that prioritizes simplicity.",
    },
  ];
  return (
    <div className="p-4 bg-white md:py-5 px-[20px] md:px-[80px] mt-[80px] md:mt-[100px]">
      <div className="relative w-full h-[100px] md:h-[250px] md:rounded-[15px] mt-[40px] md:mt-[100px]">
        <img
          src={"./tech2.jfif"}
          alt="about"
          className="w-full h-full md:rounded-[15px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-background/60 pt-[15px] md:p-5 text-center md:gap-[15px] md:rounded-[15px]">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            About Us
          </h1>
          <p className="mb-4 md:mb-6 text-[15px] md:text-3xl">
            Empowering Events, Connecting People, Simplifying Event Management.
          </p>
        </div>
      </div>
      <hr className="w-full mt-[20px] h-[3px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-40" />
      <h1 className="text-2xl md:text-4xl text-background font-bold mt-[50px] md:mt-[120px] mb-2 md:mb-4 text-center">
        Our Mission
      </h1>
      <div className="w-full mt-[20px] md:mt-[50px] text-background flexss md:gap-[50px] flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 flex flex-col gap-[10px]">
          <p className="md:mb-3 text-sm md:text-2xl text-justify">
            Our mission is to provide a seamless, innovative platform designed
            to make creating, managing, and attending events effortless. Whether
            you're planning an intimate gathering or a large-scale conference,
            our goal is to simplify the entire process.
          </p>
          <p className="mb-4 md:mb-3 text-sm md:text-2xl text-justify">
            We offer intuitive tools that reduce stress and save time, allowing
            you to focus on the details that matter most. At the heart of our
            platform is a commitment to fostering meaningful connections and
            creating unforgettable experiences. With us, event planning becomes
            less about logistics and more about making lasting memories with
            your audience.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex h-[300px] md:h-[450px] flex-col gap-[15px]">
          <img
            src={"./mission2.jfif"}
            alt="mission"
            className="w-full h-full rounded-[15px] object-cover"
          />
        </div>
      </div>

      <h1 className="text-2xl md:text-4xl text-background font-bold mt-[80px] md:mt-[150px] mb-2 md:mb-4 text-center">
        Our Vision
      </h1>
      <div className="w-full mt-[20px] md:mt-[50px] text-background flex flex-row-reverse md:flex-row gap-[20px] md:gap-[50px] flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 flex h-[300px] md:h-[450px] flex-col gap-[15px]">
          <img
            src={"./vision1.jfif"}
            alt="mission"
            className="w-full h-full rounded-[15px] object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-[10px]">
          <p className="md:mb-3 text-sm md:text-2xl text-justify">
            We imagine a world where managing events is simple, accessible, and
            stress-free for everyone. Our vision is to empower individuals and
            organizations to bring their ideas to life with ease, fostering
            creativity and innovation in event planning.
          </p>
          <p className="mb-4 md:mb-3 text-sm md:text-2xl text-justify">
            Through our platform, we aim to break down barriers, making events
            more inclusive and accessible to diverse communities. By redefining
            how events are created and experienced, we’re committed to building
            a future where meaningful connections and unforgettable experiences
            are at the heart of every gathering.
          </p>
        </div>
      </div>

      <hr className="w-full mt-[70px] h-[3px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-40" />

      <h1 className="text-xl md:text-4xl text-background font-bold mt-[50px] text-center">
        Why Choose Us?
      </h1>

      <div className="w-full text-background flexms gap-[10px] md:gap-[50px] flex-wrap">
        {Choose.map((item, index) => {
          return (
            <>
              <div
                className="relative w-[350px] h-[250px] rounded-[15px] mt-[50px]"
                key={index}
              >
                <img
                  src={item.img}
                  alt="seamless"
                  className="w-full h-full rounded-[15px] object-cover"
                />
                <div className="absolute top-0 left-0 border-primary border-[4px] text-white w-full h-full flex flex-col justify-center text-center items-center bg-background/60 p-[40px] gap-[15px] rounded-[15px]">
                  <h1 className="text-[25px] md:text-[30px] font-bold">
                    {item.title}
                  </h1>
                  <p className="text-[20px]">{item.desc}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center mt-[50px] md:mt-[100px] mb-[50px] gap-[20px] flex-col md:flex-row">
        <h1 className="text-background font-bold text-sm md:text-xl">
          Ready to create your next event?
        </h1>
        <Button className="bg-primary text-background font-bold">
          Get a Ticket
        </Button>
      </div>
    </div>
  );
}
