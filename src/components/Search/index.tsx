import React, { ChangeEvent, useRef } from 'react';
import './Search.scss';
import { close, search } from "../../assets";
import { setSearchValue } from "../../redux/header/slice";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";

const Search = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectHeader);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetSearchValue = () => {
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className="search">
      <img className="search__icon-search" src={search} alt="search"/>
      <input
        type="text"
        ref={inputRef}
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