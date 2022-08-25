import React, { FC } from 'react';
import '../../components/Notes/Notes.scss';

interface ArrowRightProps {
  canRedo: boolean;
  redoText: () => void;
}

const ArrowRight: FC<ArrowRightProps> = ({ canRedo, redoText }) => {
  return (
    <svg className={!canRedo ? "disabled-arrows" : ""} onClick={redoText}
         viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256"/>
      <polyline fill="none" points="176 152 224 104 176 56" stroke="rgb(190, 190, 191)"
                strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="16"/>
      <path d="M32,200a96,96,0,0,1,96-96h96" fill="none" stroke="rgb(190, 190, 191)" strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"/>
    </svg>
  );
};

export default ArrowRight;