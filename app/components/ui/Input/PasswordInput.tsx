"use client";

import React, { useState } from 'react';
import './Input.css';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, error, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="password-container">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`form-input form-input--password ${error ? 'form-input--error' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          tabIndex={-1}
        >
          <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
        </button>
      </div>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
};

export default PasswordInput;