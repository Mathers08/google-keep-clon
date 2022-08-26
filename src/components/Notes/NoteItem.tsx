import React, { FC } from 'react';
import './Notes.scss';
import { INote } from "../../types";

type NoteItemProps = INote & {
  isNoteListColumn: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ header, note, color, isNoteListColumn }) => {
  const customStyles = {
    width: isNoteListColumn ? '240px' : '600px',
    backgroundColor: color
  };

  return (
    <div className="note__list-item" style={customStyles}>
      <h3 className="item-header">{header}</h3>
      <p className="item-text">{note}</p>
    </div>
  );
};

export default NoteItem;