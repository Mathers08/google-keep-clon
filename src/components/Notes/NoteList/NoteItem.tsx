import React, { FC } from 'react';
import './NoteList.scss';
import { INote } from "../../../redux/notes/types";
import { useSelector } from "react-redux";
import { selectHeader } from "../../../redux/header/selectors";
import { Highlighted } from "../../../utils";
import {
  archive,
  copy,
  delete_from_trash,
  labelOutline,
  note_trash,
  palette,
  Pin,
  restore_from_trash,
  select,
  transparent,
  unzip
} from "../../../assets";
import { useAppDispatch } from "../../../hooks";
import {
  archiveNote,
  copyNote,
  deleteFromTrash,
  deleteNote,
  restoreFromTrash,
  selectNote, setIsLabelPopupVisible,
  toggleNoteColorBlock,
  togglePinned,
} from "../../../redux/notes/slice";
import Pickers from "../../Pickers";
import { useLocation } from "react-router-dom";
import { LabelPopup } from "../../Popups";

type NoteItemProps = INote & {
  isNoteListRow: boolean;
}

const NoteItem: FC<NoteItemProps> = ({
                                       id,
                                       header,
                                       note,
                                       color,
                                       image,
                                       isPinned,
                                       isArchived,
                                       isSelected,
                                       isColorBlockVisible,
                                       isLabelPopupVisible,
                                       isNoteListRow
                                     }) => {
  const customStyles = {
    item: {
      width: isNoteListRow ? '600px' : '240px',
      border: isSelected ? '2px solid #fff' : '' || image !== transparent ? `2px solid ${color}` : '',
      background: image !== transparent ? `url(${image}) right bottom / cover` : 'transparent',
      backgroundColor: image !== transparent ? '' : color
    },
    tools: {
      width: isNoteListRow ? '595px' : '281px',
      opacity: isSelected ? '1' : ''
    },
    chosen: {
      border: isSelected ? '2px solid #fff' : ''
    }
  };
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { searchValue } = useSelector(selectHeader);

  const onPinClick = () => dispatch(togglePinned(id));
  const onColorBlockClick = () => dispatch(toggleNoteColorBlock(id));
  const onLabelPopupClick = () => dispatch(setIsLabelPopupVisible(id));
  const onSelectClick = () => dispatch(selectNote(id));
  const onDeleteClick = () => dispatch(deleteNote(id));
  const onArchiveClick = () => dispatch(archiveNote(id));
  const onCopyClick = () => dispatch(copyNote(id));
  const onTrashDeleteClick = () => dispatch(deleteFromTrash(id));
  const onTrashRestoreClick = () => dispatch(restoreFromTrash(id));

  return (
    <div className="note__list-item" style={customStyles.item}>
      <h3 className="item-header">
        <Highlighted text={header} highlight={searchValue}/>
      </h3>
      <p className="item-text">
        <Highlighted text={note} highlight={searchValue}/>
      </p>
      {location.pathname === '/trash' ? <div className="note__item-tools" style={customStyles.tools}>
        <div className="tools__icons-select">
          <img src={select} alt="" onClick={onSelectClick}/>
        </div>
        <div className="tools__icons-less">
          <img src={delete_from_trash} alt="" onClick={onTrashDeleteClick}/>
          <img src={restore_from_trash} alt="" onClick={onTrashRestoreClick}/>
        </div>
      </div> : <div className="note__item-tools" style={customStyles.tools}>
        <div className="tools__icons-select">
          <img src={select} alt="" onClick={onSelectClick}/>
        </div>
        <div className="tools__icons-pin">
          <Pin isPined={isPinned} onPinClick={onPinClick}/>
        </div>
        <div className="tools__icons-less">
          <img src={isArchived ? unzip : archive} alt="" onClick={onArchiveClick}/>
          <img src={palette} alt="" onClick={onColorBlockClick}/>
          <img src={note_trash} alt="" onClick={onDeleteClick}/>
          <img src={copy} alt="" onClick={onCopyClick}/>
          <img src={labelOutline} alt="" onClick={onLabelPopupClick}/>
        </div>
      </div>}
      {isColorBlockVisible && <Pickers id={id}/>}
      {isLabelPopupVisible && <LabelPopup id={id}/>}
    </div>
  );
};

export default NoteItem;