import React, { FC } from 'react';
import './Notes.scss';

interface NoteItemProps {
  header: string
  note: string
}

const NoteItem: FC<NoteItemProps> = ({header, note}) => {
  return (
    <div className='note__list-item'>
      <h3>{header}</h3>
      <p>{note}</p>
    </div>
  );
};

export default NoteItem;