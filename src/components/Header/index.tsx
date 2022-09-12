import React, { FC, useRef } from 'react';
import './Header.scss';
import { archive, burger, close, grid1, grid2, grid3, logo, note_trash, palette, Pin, settings } from "../../assets";
import Search from "../Search";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsNavbarHidden } from "../../redux/navbar/slice";
import { useOnClickOutside } from "usehooks-ts";
import { setIsNoteListRow, setIsSettingsPopupVisible } from "../../redux/header/slice";
import { selectHeader } from "../../redux/header/selectors";
import { SettingsEnum } from "../../redux/header/types";
import { selectNotes } from "../../redux/notes/selectors";
import { declination } from "../../utils";
import { deleteNote, togglePinned } from "../../redux/notes/slice";

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
  const { notes } = useSelector(selectNotes);
  const { isSettingsPopupVisible, isNoteListRow } = useSelector(selectHeader);
  const { isNavbarHidden } = useSelector(selectNavbar);

  const selectedNotes = notes.filter(n => n.isSelected);
  const totalLength = selectedNotes.length;
  const declSelect = declination(totalLength, ['Выбрана', 'Выбраны', 'Выбрано']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const selectedNotesCountInfo = totalLength && <>{declSelect} {totalLength} {declNote}</>;

  console.log(selectedNotes);
  const onCancelClick = () => 0;
  const onPinClick = () => dispatch(togglePinned(selectedNotes));
  const onDeleteClick = () => dispatch(deleteNote(selectedNotes));
  const onBurgerClick = () => dispatch(setIsNavbarHidden(!isNavbarHidden));
  const onGridIconClick = () => dispatch(setIsNoteListRow(!isNoteListRow));
  const onSettingsPopupClick = () => dispatch(setIsSettingsPopupVisible(!isSettingsPopupVisible));
  useOnClickOutside(settingsRef, () => dispatch(setIsSettingsPopupVisible(false)));

  return (
    <header className={`header ${totalLength && 'selected-notes-header'}`}>
      {totalLength
        ? <>
          <div className="header__left">
            <div className="header__left-close">
              <img src={close} alt="close" onClick={onCancelClick}/>
            </div>
            <p className="header__left-text">
              {selectedNotesCountInfo}
            </p>
          </div>
          <div className="header__right">
            <div className="header__right-icons selected-notes-icons">
              <Pin isPined={false} onPinClick={onPinClick}/>
              <img src={archive} alt=""/>
              <img src={palette} alt=""/>
              <img src={note_trash} alt="" onClick={onDeleteClick}/>
            </div>
          </div>
        </>
        :
        <>
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
              <img src={settings} alt="" ref={settingsRef} onClick={onSettingsPopupClick}/>

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
        </>}
    </header>
  );
};

export default Header;