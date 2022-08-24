import React, { FC } from 'react';
import './Notes.scss';

interface NoteItemProps {
  header: string;
  note: string;
  isNoteListColumn: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ header, note, isNoteListColumn }) => {
  return (
    <div className="note__list-item" style={isNoteListColumn ? { width: '240px' } : { width: '600px' }}>
      <h3>{header}</h3>
      <p>{note}</p>
    </div>
  );
};

export default NoteItem;