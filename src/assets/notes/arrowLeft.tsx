import React, { FC } from 'react';
import '../../components/Notes/NoteForm/NoteForm.scss';

interface ArrowLeftProps {
  canUndo: boolean;
  undoText: () => void;
}

const ArrowLeft: FC<ArrowLeftProps> = ({ canUndo, undoText }) => {
  return (
    <svg className={!canUndo ? "disabled-arrows" : ""} onClick={undoText} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256"/>
      <polyline fill="none" points="80 152 32 104 80 56" stroke="rgb(190, 190, 191)" strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"/>
      <path d="M224,200a96,96,0,0,0-96-96H32" fill="none" stroke="rgb(190, 190, 191)" strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"/>
    </svg>
  );
};

export default ArrowLeft;