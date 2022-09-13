import React, { FC, useRef } from 'react';
import './Header.scss';
import {
  services,
  archive,
  burger,
  close,
  copy,
  grid1,
  grid2,
  logo,
  note_trash,
  palette,
  pin,
  settings
} from "../../assets";
import Search from "../Search";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsNavbarHidden } from "../../redux/navbar/slice";
import { useOnClickOutside } from "usehooks-ts";
import { setIsNoteListRow, setIsServicesPopupVisible, setIsSettingsPopupVisible } from "../../redux/header/slice";
import { selectHeader } from "../../redux/header/selectors";
import { selectNotes } from "../../redux/notes/selectors";
import { declination } from "../../utils";
import { copyNote, deleteNote, togglePinned } from "../../redux/notes/slice";
import { servicesItems, settingsItems } from "../../redux/header/types";


const Header: FC = () => {
  const dispatch = useAppDispatch();
  const settingsRef = useRef(null);
  const servicesRef = useRef(null);
  const { notes } = useSelector(selectNotes);
  const { isSettingsPopupVisible, isServicesPopupVisible, isNoteListRow } = useSelector(selectHeader);
  const { isNavbarHidden } = useSelector(selectNavbar);

  const selectedNotes = notes.filter(n => n.isSelected);
  const totalLength = selectedNotes.length;
  const declSelect = declination(totalLength, ['Выбрана', 'Выбраны', 'Выбрано']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const selectedNotesCountInfo = totalLength && <>{declSelect} {totalLength} {declNote}</>;

  const onCancelClick = () => {
    return selectedNotes.length = 0;
  };
  console.log(selectedNotes);

  const onPinClick = () => dispatch(togglePinned(selectedNotes));
  const onDeleteClick = () => dispatch(deleteNote(selectedNotes));
  const onCopyClick = () => dispatch(copyNote(selectedNotes));
  const onBurgerClick = () => dispatch(setIsNavbarHidden(!isNavbarHidden));
  const onGridIconClick = () => dispatch(setIsNoteListRow(!isNoteListRow));
  const onSettingsPopupClick = () => dispatch(setIsSettingsPopupVisible(!isSettingsPopupVisible));
  const onServicesPopupClick = () => dispatch(setIsServicesPopupVisible(!isServicesPopupVisible));
  useOnClickOutside(settingsRef, () => dispatch(setIsSettingsPopupVisible(false)));
  useOnClickOutside(servicesRef, () => dispatch(setIsServicesPopupVisible(false)));

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
              <img src={pin} alt="" onClick={onPinClick}/>
              <img src={archive} alt=""/>
              <img src={palette} alt=""/>
              <img src={note_trash} alt="" onClick={onDeleteClick}/>
              <img src={copy} alt="" onClick={onCopyClick}/>
            </div>
          </div>
        </>
        : <>
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
              <img src={services} alt="" ref={servicesRef} onClick={onServicesPopupClick}/>

              {isSettingsPopupVisible && <div className="settings__popup">
                <ul>
                  {settingsItems && settingsItems.map((obj, index) => (
                    <li key={`${obj.id}_${index}`}>{obj.item}</li>
                  ))}
                </ul>
              </div>}

              {isServicesPopupVisible && <div className="services__popup">
                {servicesItems && servicesItems.map((obj, index) => (
                  <div className="services__popup-item" key={`${obj.id}_${index}`}>
                    <a href={obj.href}><img src={obj.src} alt=""/></a>
                    <p>{obj.title}</p>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </>}
    </header>
  );
};

export default Header;