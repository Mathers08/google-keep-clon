import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './Notes.scss';
import { INote } from "../../types";

interface NoteListProps {
  notes: INote[];
  isNoteListColumn: boolean;
}

const NoteList: FC<NoteListProps> = ({ notes, isNoteListColumn }) => {
  return (
    <div className={`${isNoteListColumn ? 'note__list' : 'note__columnList'}`}>
      {notes.map((note, index) => (
        <NoteItem
          key={`${note} + ${index}`}
          {...note}
          isNoteListColumn={isNoteListColumn}
        />
      ))}
    </div>
  );
};

export default NoteList;