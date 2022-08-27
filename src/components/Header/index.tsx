import React, { FC, useEffect, useRef, useState } from 'react';
import './Header.scss';
import { burger, grid1, grid2, grid3, logo, search, settings } from "../../assets";
import { handleClickOutside } from "../../utils";

interface HeaderProps {
  isNoteListColumn: boolean;
  onBurgerClick: () => void;
  onGridIconClick: () => void;
}

const Header: FC<HeaderProps> = ({ isNoteListColumn, onBurgerClick, onGridIconClick }) => {
  const settingsRef = useRef(null);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const toggleSettingsPopup = () => setSettingsPopup(!settingsPopup);
  const settingItems = [
    'Настройки',
    'Отключить тёмную тему',
    'Отправить отзыв',
    'Справка',
    'Скачать приложение',
    'Быстрые клавиши'
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => handleClickOutside(e, settingsRef, setSettingsPopup);
    document.body.addEventListener('click', handler);
    return () => document.body.removeEventListener('click', handler);
  }, []);

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
        <div className="header__right-icons">
          {isNoteListColumn
            ? <img onClick={onGridIconClick} src={grid2} alt=""/>
            : <img onClick={onGridIconClick} src={grid1} alt=""/>
          }
          <img src={settings} alt="" ref={settingsRef} onClick={toggleSettingsPopup}/>

          {settingsPopup && <div className="settings__popup">
            <ul>
              {settingItems && settingItems.map((obj, index) => (
                <li key={`${obj}_${index}`}>{obj}</li>
              ))}
            </ul>
          </div>}

          <img src={grid3} alt=""/>
        </div>
        <div className="header__right-account"></div>
      </div>
    </header>
  );
};

export default Header;