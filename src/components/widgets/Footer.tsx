import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Logo & Name */}
        <div className="text-2xl font-semibold tracking-wide flex items-center gap-2">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            EventFi
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="/events" className="hover:text-purple-400 transition">Events</a>
          <a href="/about" className="hover:text-purple-400 transition">About</a>
          <a href="/faq" className="hover:text-purple-400 transition">FAQ</a>
          <a href="/contact" className="hover:text-purple-400 transition">Contact</a>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" className="text-xl hover:text-blue-400 transition"><FaTwitter /></a>
          <a href="#" className="text-xl hover:text-purple-400 transition"><FaDiscord /></a>
          <a href="#" className="text-xl hover:text-gray-400 transition"><FaGithub /></a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EventFi. All rights reserved.
      </div>

      {/* Floating Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-40" />
    </footer>
  );
};

export default Footer;
