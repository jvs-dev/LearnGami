import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className = '', ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className={`form-input ${error ? 'form-input--error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
};

export default Input;