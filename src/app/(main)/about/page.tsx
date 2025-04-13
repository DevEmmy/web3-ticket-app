"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
// Import Iconsax icons
import { 
  Activity, 
  Timer1, 
  StatusUp, 
  Global, 
  MagicStar, 
  People,
  Calendar, 
  Ticket, 
  Setting4, 
  Chart, 
  Monitor, 
  Link21
} from "iconsax-react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Seamless Event Creation",
      desc: "Easily plan and organize events with intuitive tools that streamline the entire process.",
      icon: <Calendar size="32" variant="Bold" color="#e9d5ff" />,
    },
    {
      title: "NFT Ticketing",
      desc: "Bring your events into the future with blockchain-powered digital ticketing solutions.",
      icon: <Ticket size="32" variant="Bold" color="#e9d5ff" />,
    },
    {
      title: "Customizable Options",
      desc: "Tailor events to your specific needs with various categories, features, and themes.",
      icon: <Setting4 size="32" variant="Bold" color="#e9d5ff" />,
    },
    {
      title: "Real-Time Analytics",
      desc: "Stay informed with detailed insights on ticket sales, attendee engagement, and event performance.",
      icon: <Chart size="32" variant="Bold" color="#e9d5ff" />,
    },
    {
      title: "User-Friendly Interface",
      desc: "Navigate effortlessly with a design that prioritizes simplicity without sacrificing functionality.",
      icon: <Monitor size="32" variant="Bold" color="#e9d5ff" />,
    },
    {
      title: "Web3 Integration",
      desc: "Future-proof your events with blockchain technology and decentralized applications.",
      icon: <Link21 size="32" variant="Bold" color="#e9d5ff" />,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-[#140121] text-white min-h-screen">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <img 
          src="/image.png" 
          alt="3D Cubes" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-20 px-4">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            About Us
          </h1>
          <p className={`text-xl md:text-2xl text-center max-w-3xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Empowering Events, Connecting People, Revolutionizing Experiences
          </p>
        </div>
      </div>

      <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 shadow-[0_0_15px_5px_rgba(147,51,234,0.5)]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Our Mission
        </h2>
        <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-8 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-lg shrink-0">
                <Activity size="28" variant="Bold" color="#ffffff" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Innovation at the Core</h3>
                <p className="text-gray-200">
                  Our mission is to provide a seamless, innovative platform designed to make creating, managing, and attending events effortless. Whether you're planning an intimate gathering or a large-scale conference, our goal is to simplify the entire process through cutting-edge technology.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg shrink-0">
                <Timer1 size="28" variant="Bold" color="#ffffff" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Time-Saving Solutions</h3>
                <p className="text-gray-200">
                  We offer intuitive tools that reduce stress and save time, allowing you to focus on the details that matter most. Our streamlined workflows and automated processes eliminate unnecessary complexity, making event management more efficient than ever before.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-lg shrink-0">
                <StatusUp size="28" variant="Bold" color="#ffffff" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-200">Meaningful Connections</h3>
                <p className="text-gray-200">
                  At the heart of our platform is a commitment to fostering meaningful connections and creating unforgettable experiences. We believe technology should enhance human interaction, not replace it. Our tools are designed to facilitate deeper engagement between organizers and attendees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Our Vision
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-6 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm transform transition-all duration-500 hover:translate-y-[-8px]">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Global size="32" variant="Bold" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-200">Accessible For All</h3>
            <p className="text-gray-300">
              We imagine a world where managing events is simple, accessible, and stress-free for everyone, regardless of technical expertise or resources. Our vision is to democratize event planning technology.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-6 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm transform transition-all duration-500 hover:translate-y-[-8px]">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <MagicStar size="32" variant="Bold" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-200">Future-Ready Platform</h3>
            <p className="text-gray-300">
              We're building a foundation for the next generation of event experiences, incorporating blockchain, AI, and other emerging technologies to create a platform that evolves with the rapidly changing digital landscape.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-6 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm transform transition-all duration-500 hover:translate-y-[-8px]">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <People size="32" variant="Bold" color="#ffffff" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-200">Inclusive Communities</h3>
            <p className="text-gray-300">
              Through our platform, we aim to break down barriers, making events more inclusive and accessible to diverse communities worldwide. We believe in creating spaces where everyone feels welcome and valued.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 shadow-[0_0_15px_5px_rgba(147,51,234,0.5)]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Why Choose Us?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-6 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm transform transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_8px_30px_rgba(168,85,247,0.4)]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-purple-200">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="bg-gradient-to-br from-purple-900/70 to-blue-900/70 rounded-xl p-8 md:p-12 shadow-[0_4px_20px_rgba(168,85,247,0.25)] border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your next event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of event organizers who are transforming how people connect through our powerful platform.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-full text-lg shadow-[0_4px_20px_rgba(168,85,247,0.5)] transform transition-transform hover:scale-105">
              Get Started
            </Button>
            <Button className="bg-transparent border-2 border-purple-400 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-purple-900/30 transform transition-transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </div>
      </div>

 
    </div>
  );
}