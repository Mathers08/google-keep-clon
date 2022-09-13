import React, { FC } from 'react';
import './NoteList.scss';
import { INote } from "../../../redux/notes/types";
import { useSelector } from "react-redux";
import { selectHeader } from "../../../redux/header/selectors";
import { CustomAlert, Highlighted } from "../../../utils";
import { archive, copy, note_trash, palette, Pin, select, transparent } from "../../../assets";
import { useAppDispatch } from "../../../hooks";
import { copyNote, deleteNote, toggleNoteColorBlock, togglePinned, toggleSelected } from "../../../redux/notes/slice";
import Pickers from "../../Pickers";

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
                                       isSelected,
                                       isColorBlockVisible,
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
  const { searchValue } = useSelector(selectHeader);

  const onPinClick = () => dispatch(togglePinned(id));
  const onColorBlockClick = () => dispatch(toggleNoteColorBlock(id));
  const onSelectClick = () => dispatch(toggleSelected(id));
  const onDeleteClick = () => dispatch(deleteNote(id));
  const onCopyClick = () => dispatch(copyNote(id));

  return (
    <div className="note__list-item" style={customStyles.item}>
      <h3 className="item-header">
        <Highlighted text={header} highlight={searchValue}/>
      </h3>
      <p className="item-text">
        <Highlighted text={note} highlight={searchValue}/>
      </p>
      <div className="note__item-tools" style={customStyles.tools}>
        <div className="tools__icons-select">
          <img src={select} alt="" onClick={onSelectClick}/>
        </div>
        <div className="tools__icons-pin">
          <Pin isPined={isPinned} onPinClick={onPinClick}/>
        </div>
        <div className="tools__icons-less">
          <img src={archive} alt=""/>
          <img src={palette} alt="" onClick={onColorBlockClick}/>
          <img src={note_trash} alt="" onClick={onDeleteClick}/>
          <img src={copy} alt="" onClick={onCopyClick}/>
        </div>
      </div>
      {isColorBlockVisible && <Pickers id={id}/>}
    </div>
  );
};

export default NoteItem;