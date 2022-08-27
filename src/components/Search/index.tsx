import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import './Search.scss';
import { close, search } from "../../assets";
import { debounce } from "lodash";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const resetSearchValue = () => {
    setSearchValue('');
    setSearchValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 1000), []
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <img className="search__icon-search" src={search} alt="search"/>
      <input
        type="text"
        value={searchValue}
        onChange={onInputChange}
        placeholder="Поиск"
        className="search__input"
      />
      {searchValue &&
        <img src={close} className="search__icon-close" onClick={resetSearchValue} alt="close"/>
      }
    </div>
  );
};

export default Search;