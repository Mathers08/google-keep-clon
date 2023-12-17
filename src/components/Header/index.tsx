import React, { FC, useEffect } from 'react';
import './Header.scss';
import {
  archive,
  burger,
  close,
  copy,
  delete_from_trash,
  grid1,
  grid2,
  logo,
  note_trash,
  palette,
  pin,
  restore_from_trash,
  services,
  settings,
  unzip
} from "../../assets";
import Search from "../Search";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsNavbarHidden } from "../../redux/navbar/slice";
import { setIsNoteListRow, setIsServicesPopupVisible, setIsSettingsPopupVisible } from "../../redux/header/slice";
import { selectHeader } from "../../redux/header/selectors";
import { selectNotes } from "../../redux/notes/selectors";
import { declination } from "../../utils";
import {
  archiveNote,
  copyNote,
  deleteFromTrash,
  deleteNote,
  restoreFromTrash,
  selectNote,
  toggleNoteColorBlock,
  togglePinned
} from "../../redux/notes/slice";
import { useLocation } from "react-router-dom";
import { ServicesPopup, SettingsPopup } from "../Popups";
import Pickers from "../Pickers";
import { selectForm } from "../../redux/form/selectors";
import { setIsColorBlockVisible } from "../../redux/form/slice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { notes } = useSelector(selectNotes);
  const { isColorBlockVisible } = useSelector(selectForm);
  const { isSettingsPopupVisible, isServicesPopupVisible, isNoteListRow } = useSelector(selectHeader);
  const { isNavbarHidden } = useSelector(selectNavbar);

  const selectedNotes = notes.filter(n => n.isSelected);
  const totalLength = selectedNotes.length;
  const declSelect = declination(totalLength, ['Выбрана', 'Выбраны', 'Выбрано']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const selectedNotesCountInfo = totalLength && <>{declSelect} {totalLength} {declNote}</>;

  const onCancelClick = () => dispatch(selectNote(selectedNotes));
  const onPinClick = () => dispatch(togglePinned(selectedNotes));
  const onArchiveClick = () => dispatch(archiveNote(selectedNotes));
  const onDeleteClick = () => dispatch(deleteNote(selectedNotes));
  const onCopyClick = () => dispatch(copyNote(selectedNotes));
  const onTrashRestoreClick = () => dispatch(restoreFromTrash(selectedNotes));
  const onTrashDeleteClick = () => dispatch(deleteFromTrash(selectedNotes));
  const onBurgerClick = () => dispatch(setIsNavbarHidden(!isNavbarHidden));
  const onGridIconClick = () => dispatch(setIsNoteListRow(!isNoteListRow));
  const onSettingsPopupClick = () => dispatch(setIsSettingsPopupVisible(!isSettingsPopupVisible));
  const onServicesPopupClick = () => dispatch(setIsServicesPopupVisible(!isServicesPopupVisible));

  useEffect(() => {
    onCancelClick();
  }, [location]);

  return (
    <header className={`header ${totalLength ? 'selected-notes-header' : ''}`}>
      {totalLength
        ? <>
          <div className="header__left">
            <div className="header__left-close">
              <img src={close} alt="close" onClick={onCancelClick}/>
            </div>
            <p className="header__left-text">{selectedNotesCountInfo}</p>
          </div>
          <div className="header__right">
            {location.pathname === '/trash' ? <div className="header__right-icons selected-notes-icons">
              <img src={delete_from_trash} alt="" onClick={onTrashDeleteClick}/>
              <img src={restore_from_trash} alt="" onClick={onTrashRestoreClick}/>
            </div> : <div className="header__right-icons selected-notes-icons">
              <img src={pin} alt="" onClick={onPinClick}/>
              <img src={location.pathname === '/archive' ? unzip : archive} alt="" onClick={onArchiveClick}/>
              <img src={note_trash} alt="" onClick={onDeleteClick}/>
              <img src={copy} alt="" onClick={onCopyClick}/>
              {isColorBlockVisible && <Pickers id={''} position={{ top: '7%', left: '60%' }}/>}
            </div>}
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
              <img src={settings} alt="" onClick={onSettingsPopupClick}/>
              <img src={services} alt="" onClick={onServicesPopupClick}/>

              {isSettingsPopupVisible && <SettingsPopup/>}
              {isServicesPopupVisible && <ServicesPopup/>}
            </div>
          </div>
        </>}
    </header>
  );
};

export default Header;