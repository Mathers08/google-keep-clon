import React, { FC, useRef } from 'react';
import './Header.scss';
import { burger, grid1, grid2, grid3, logo, settings } from "../../assets";
import Search from "../Search";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/note/selectors";
import { useAppDispatch } from "../../hooks";
import { setIsNoteListColumn } from "../../redux/note/slice";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsNavbarHidden } from "../../redux/navbar/slice";
import { useOnClickOutside } from "usehooks-ts";
import { setIsSettingsPopupVisible } from "../../redux/header/slice";
import { selectHeader } from "../../redux/header/selectors";

const Header: FC = () => {
  const settingItems = [
    'Настройки',
    'Отключить тёмную тему',
    'Отправить отзыв',
    'Справка',
    'Скачать приложение',
    'Быстрые клавиши'
  ];
  const dispatch = useAppDispatch();
  const settingsRef = useRef(null);
  const { isSettingsPopupVisible } = useSelector(selectHeader);
  const { isNoteListColumn } = useSelector(selectNote);
  const { isNavbarHidden } = useSelector(selectNavbar);

  const onBurgerClick = () => dispatch(setIsNavbarHidden(!isNavbarHidden));
  const onGridIconClick = () => dispatch(setIsNoteListColumn(!isNoteListColumn));
  const toggleSettingsPopup = () => dispatch(setIsSettingsPopupVisible(!isSettingsPopupVisible));
  const handleClickOutside = () => dispatch(setIsSettingsPopupVisible(false));
  useOnClickOutside(settingsRef, handleClickOutside);

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
      <Search/>
      <div className="header__right">
        <div className="header__right-icons">
          {isNoteListColumn
            ? <img onClick={onGridIconClick} src={grid2} alt=""/>
            : <img onClick={onGridIconClick} src={grid1} alt=""/>
          }
          <img src={settings} alt="" ref={settingsRef} onClick={toggleSettingsPopup}/>

          {isSettingsPopupVisible && <div className="settings__popup">
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