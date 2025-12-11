import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Pesquisar..." 
}) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <i className="bi bi-search search-icon"></i>
    </div>
  );
};

export default SearchInput;