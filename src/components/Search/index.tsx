import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import './Search.scss';
import { close, search } from "../../assets";
import { debounce } from "lodash";
import { setSearchValue } from "../../redux/header/slice";
import { useAppDispatch } from "../../hooks";

const Search = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const resetSearchValue = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000), []
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    updateSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <img className="search__icon-search" src={search} alt="search"/>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={onInputChange}
        placeholder="Поиск"
        className="search__input"
      />
      {value &&
        <img src={close} className="search__icon-close" onClick={resetSearchValue} alt="close"/>
      }
    </div>
  );
};

export default Search;