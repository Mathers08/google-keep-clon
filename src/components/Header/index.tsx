import React, { FC, useRef } from 'react';
import './Header.scss';
import { burger, grid1, grid2, grid3, logo, settings } from "../../assets";
import Search from "../Search";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsNavbarHidden } from "../../redux/navbar/slice";
import { useOnClickOutside } from "usehooks-ts";
import { setIsNoteListRow, setIsSettingsPopupVisible } from "../../redux/header/slice";
import { selectHeader } from "../../redux/header/selectors";
import { SettingsEnum } from "../../redux/header/types";

type SettingsItem = {
  id: number;
  item: SettingsEnum
}

export const settingsItems: SettingsItem[] = [
  {
    id: 0,
    item: SettingsEnum.SETTINGS
  },
  {
    id: 1,
    item: SettingsEnum.DISABLE_DARK_THEME
  },
  {
    id: 2,
    item: SettingsEnum.POST_REVIEW
  },
  {
    id: 3,
    item: SettingsEnum.REFERENCE
  },
  {
    id: 4,
    item: SettingsEnum.DOWNLOAD_APP
  },
  {
    id: 5,
    item: SettingsEnum.SHORTCUTS
  }
];

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const settingsRef = useRef(null);
  const { isSettingsPopupVisible, isNoteListRow } = useSelector(selectHeader);
  const { isNavbarHidden } = useSelector(selectNavbar);

  const onBurgerClick = () => dispatch(setIsNavbarHidden(!isNavbarHidden));
  const onGridIconClick = () => dispatch(setIsNoteListRow(!isNoteListRow));
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
          {isNoteListRow
            ? <img onClick={onGridIconClick} src={grid2} alt=""/>
            : <img onClick={onGridIconClick} src={grid1} alt=""/>
          }
          <img src={settings} alt="" ref={settingsRef} onClick={toggleSettingsPopup}/>

          {isSettingsPopupVisible && <div className="settings__popup">
            <ul>
              {settingsItems && settingsItems.map((obj, index) => (
                <li key={`${obj.id}_${index}`}>{obj.item}</li>
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