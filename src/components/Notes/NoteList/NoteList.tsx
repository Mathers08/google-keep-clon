import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './NoteList.scss';
import { useSelector } from "react-redux";
import { selectHeader } from "../../../redux/header/selectors";
import { declination } from "../../../utils";
import { selectNotes } from "../../../redux/notes/selectors";
import { notifications } from "../../../assets";

const NoteList: FC = () => {
  const { notes } = useSelector(selectNotes);
  const { searchValue, isNoteListRow } = useSelector(selectHeader);

  const filteredNotes =
    notes.filter(note => (
      note.header.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.note.toLowerCase().includes(searchValue.toLowerCase())
    ));

  const pinnedNotes = filteredNotes.filter(n => n.isPinned && !n.isDeleted && !n.isArchived);
  const unpinnedNotes = filteredNotes.filter(n => !n.isPinned && !n.isDeleted && !n.isArchived);

  const pinnedNoteItems = pinnedNotes.map(note => (
    <NoteItem
      key={note.id}
      {...note}
      isNoteListRow={isNoteListRow}
    />
  ));
  const unpinnedNoteItems = unpinnedNotes.map(note => (
    <NoteItem
      key={note.id}
      {...note}
      isNoteListRow={isNoteListRow}
    />
  ));

  const customStyles = {
    margin: isNoteListRow ? '0 auto' : '0 0 0 60px',
    color: '#cecece',
    fontWeight: 800,
    lineHeight: '1rem'
  };
  const totalLength = pinnedNotes.length + unpinnedNotes.length;
  const declFind = declination(totalLength, ['Найдена', 'Найдены', 'Найдено']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const foundNotesCountInfo = totalLength === 0
    ? <h2 style={customStyles}>Заметки не найдены</h2>
    : <h2 style={customStyles}>{declFind} {totalLength} {declNote}</h2>;

  return (
    <div className="note__block">
      {totalLength > 0 ? <>
        {searchValue && foundNotesCountInfo}
        {pinnedNoteItems.length > 0 &&
          <div className={`${isNoteListRow ? 'note__columnBlock-item' : 'note__block-item'}`}>
            <div className="note__block-title">Закрепленные</div>
            <div className="note__list">{pinnedNoteItems}</div>
          </div>}
        <div className={`${isNoteListRow ? 'note__columnBlock-item' : 'note__block-item'}`}>
          {pinnedNoteItems.length > 0 && unpinnedNoteItems.length > 0 &&
            <div className="note__block-title">Другие заметки</div>
          }
          <div className="note__list">{unpinnedNoteItems}</div>
        </div>
      </> : <div className='note__block-item'>
        <div className="emptyList">
          <img className="emptyList-img" src={notifications} alt="" />
          <h2 className="emptyList-text">Добавьте свою первую заметку!</h2>
        </div>
      </div>}
    </div>
  );
};

export default NoteList;