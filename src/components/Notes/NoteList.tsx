import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './Notes.scss';
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";
import { selectNote } from "../../redux/note/selectors";

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

  return (
    <div className="note__block">
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