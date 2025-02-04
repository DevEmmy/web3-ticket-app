import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 border-primary px-10 py-3 rounded-full text-center w-fit ${className} bg-white/10 backdrop-blur-lg shadow-lg`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
