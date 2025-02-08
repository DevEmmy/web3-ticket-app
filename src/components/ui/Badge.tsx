import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    type?: "success" | "pending" | "failed" | "info" | "warning"; // Badge types
    className?: string; // Custom styles
  }
  
  const Badge = ({ children, type = "info", className }: BadgeProps) => {
    const baseStyle = "px-3 py-1 rounded-full text-sm font-medium";
    const typeStyles = {
      success: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      failed: "bg-red-500 text-white",
      info: "bg-blue-500 text-white",
      warning: "bg-orange-500 text-white",
    };
  
    return (
      <span className={`${baseStyle} ${typeStyles[type]} ${className || ""}`}>
        {children}
      </span>
    );
  };
  
  export default Badge;
  