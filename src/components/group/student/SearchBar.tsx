/* eslint-disable no-unused-vars */
import React from 'react';
import Search from '@assets/images/group/search.svg';
import '@styles/group/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onInputChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onInputChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onSearch(value);
    onInputChange(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="그룹 이름을 검색하세요"
      />
    </div>
  );
};

export default SearchBar;
