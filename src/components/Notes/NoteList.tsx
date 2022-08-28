import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './Notes.scss';
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";
import { selectNote } from "../../redux/note/selectors";

const NoteList: FC = () => {
  const { notes, pinedNotes, isNoteListColumn } = useSelector(selectNote);
  const { searchValue } = useSelector(selectHeader);
  const noteItems = notes
    .filter(note => note.header.toLowerCase().includes(searchValue.toLowerCase()))
    .map((note, index) => (
      <NoteItem
        key={`${note} + ${index}`}
        {...note}
        isNoteListColumn={isNoteListColumn}
      />
    ));
  const pinedNoteItems = pinedNotes
    .filter(note => note.header.toLowerCase().includes(searchValue.toLowerCase()))
    .map((note, index) => (
      <NoteItem
        key={`${note} + ${index}`}
        {...note}
        isNoteListColumn={isNoteListColumn}
      />
    ));

  return (
    <div className="note__block">
      {pinedNotes.length > 0 &&
        <div className={`${isNoteListColumn ? 'note__columnBlock-item' : 'note__block-item'}`}>
          <div className="note__block-title">Закрепленные</div>
          <div className="note__list">{pinedNoteItems}</div>
        </div>}
      <div className={`${isNoteListColumn ? 'note__columnBlock-item' : 'note__block-item'}`}>
        {pinedNotes.length > 0 && notes.length > 0 && <div className="note__block-title">Другие заметки</div>}
        <div className="note__list">{noteItems}</div>
      </div>
    </div>
  );
};

export default NoteList;