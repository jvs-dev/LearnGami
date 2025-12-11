import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ isLoading, children, className = '', disabled, ...props }) => {
  return (
    <button
      className={`btn-primary ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
};

export default Button;