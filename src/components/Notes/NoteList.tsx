import React, { FC } from 'react';
import NoteItem from "./NoteItem";
import './Notes.scss';
import { INote } from "../../types";

interface NoteListProps {
  notes: INote[];
  pinedNotes: INote[];
  isNoteListColumn: boolean;
}

const NoteList: FC<NoteListProps> = ({ notes, pinedNotes, isNoteListColumn }) => {
  return (
    <div className="note__block">
      {pinedNotes.length > 0 &&
        <div className={`${isNoteListColumn ? 'note__block-item' : 'note__columnBlock-item'}`}>
          <div className="note__block-title">Закрепленные</div>
          <div className="note__list">
            {pinedNotes.map((note, index) => (
              <NoteItem
                key={`${note} + ${index}`}
                {...note}
                isNoteListColumn={isNoteListColumn}
              />
            ))}
          </div>
        </div>}
      <div className={`${isNoteListColumn ? 'note__block-item' : 'note__columnBlock-item'}`}>
        {pinedNotes.length > 0 && notes.length > 0 && <div className="note__block-title">Другие заметки</div>}
        <div className="note__list">
          {notes.map((note, index) => (
            <NoteItem
              key={`${note} + ${index}`}
              {...note}
              isNoteListColumn={isNoteListColumn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;