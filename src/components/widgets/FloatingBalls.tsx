"use client";

import { motion } from "framer-motion";

const balls = [
  { size: 200, color: "bg-purple-500", x: -100, y: -50 },
  { size: 150, color: "bg-blue-500", x: 200, y: 100 },
  { size: 180, color: "bg-pink-500", x: -150, y: 250 },
  { size: 120, color: "bg-yellow-500", x: 300, y: -100 },
  { size: 170, color: "bg-green-500", x: -250, y: -200 },
];

const FloatingBalls = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          initial={{ x: ball.x, y: ball.y, opacity: 0.6, scale: 1 }}
          animate={{
            x: [ball.x, ball.x + 50, ball.x - 50, ball.x],
            y: [ball.y, ball.y - 50, ball.y + 50, ball.y],
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${ball.color} rounded-full blur-3xl`}
          style={{
            width: ball.size,
            height: ball.size,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBalls;
