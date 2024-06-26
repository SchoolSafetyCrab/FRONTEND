/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Search from '@assets/images/group/search.svg';
import '@styles/group/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="그룹 이름을 검색하세요"
      />
      <button type="button" onClick={handleSearchClick}>
        <img src={Search} alt="검색하기" />
      </button>
    </div>
  );
};

export default SearchBar;
