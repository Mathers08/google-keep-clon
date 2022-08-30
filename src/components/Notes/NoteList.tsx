import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './Notes.scss';
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";
import { selectNote } from "../../redux/note/selectors";
import { declination } from "../../utils";

const NoteList: FC = () => {
  const { notes, pinedNotes, isNoteListColumn } = useSelector(selectNote);
  const { searchValue } = useSelector(selectHeader);

  const filteredNotes =
    notes.filter(note => (
      note.header.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.note.toLowerCase().includes(searchValue.toLowerCase())
    ));
  const filteredPinedNotes =
    pinedNotes.filter(pinedNote => (
      pinedNote.header.toLowerCase().includes(searchValue.toLowerCase()) ||
      pinedNote.note.toLowerCase().includes(searchValue.toLowerCase())
    ));

  const noteItems = filteredNotes.map(note => (
    <NoteItem
      key={note.id}
      {...note}
      isNoteListColumn={isNoteListColumn}
    />
  ));
  const pinedNoteItems = filteredPinedNotes.map(pinedNote => (
    <NoteItem
      key={pinedNote.id}
      {...pinedNote}
      isNoteListColumn={isNoteListColumn}
    />
  ));


  const totalLength = noteItems.length + pinedNoteItems.length;
  const declFind = declination(totalLength, ['Найдена', 'Найдены', 'Найдено']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const findNotesCountInfo = totalLength === 0
    ? <h2 className='note__block-text'>Заметки не найдены</h2>
    : <h2 className='note__block-text'>{declFind} {totalLength} {declNote}</h2>

  return (
    <div className="note__block">
      {searchValue && findNotesCountInfo}
      {pinedNoteItems.length > 0 &&
        <div className={`${isNoteListColumn ? 'note__columnBlock-item' : 'note__block-item'}`}>
          <div className="note__block-title">Закрепленные</div>
          <div className="note__list">{pinedNoteItems}</div>
        </div>}
      <div className={`${isNoteListColumn ? 'note__columnBlock-item' : 'note__block-item'}`}>
        {pinedNoteItems.length > 0 && noteItems.length > 0 &&
          <div className="note__block-title">Другие заметки</div>
        }
        <div className="note__list">{noteItems}</div>
      </div>
    </div>
  );
};

export default NoteList;