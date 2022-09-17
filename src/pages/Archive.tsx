import React from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";

const Archive = () => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);
  const archivedNotes = notes.filter(n => n.isArchived);
  const customStyles = {
    margin: '0 0 0 60px',
    color: '#cecece',
    fontWeight: 800,
  };

  return (
    <div className='note__block'>
      <div className="note__block-item">
        {archivedNotes.length ? <div className="note__list">
          {archivedNotes.map(obj => (
            <NoteItem key={obj.id} {...obj} isNoteListRow={isNoteListRow}/>
          ))}
        </div> : <h2 style={customStyles}>Архив пустой</h2>}
      </div>
    </div>
  );
};

export default Archive;