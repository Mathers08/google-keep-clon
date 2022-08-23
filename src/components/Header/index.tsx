import React, { FC } from 'react';
import logo from '../../assets/logo.png';
import './Header.scss';
import { burger, grid1, grid2, grid3, search, settings } from "../../assets";

interface HeaderProps {
  onBurgerClick: () => void;
}

const Header: FC<HeaderProps> = ({ onBurgerClick }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__left-burger" onClick={onBurgerClick}>
          <img src={burger} alt="burger"/>
        </div>
        <div className="header__left-logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="header__left-name">Keep</div>
      </div>
      <div className="header__middle">
        <img className="header__middle-icon" src={search} alt=""/>
        <input type="text" placeholder="Поиск" className="header__middle-input"/>
      </div>
      <div className="header__right">
        <div className="header__right-buttons">
          <img src={grid1} alt=""/>
          <img src={grid2} alt=""/>
          <img src={settings} alt=""/>
          <img src={grid3} alt=""/>
        </div>
        <div className="header__right-account"></div>
      </div>
    </header>
  );
};

export default Header;