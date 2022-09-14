import React from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";

const Trash = () => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);
  const deletedNotes = notes.filter(n => n.isDeleted);
  const customStyles = {
    margin: '0 0 0 60px',
    color: '#cecece',
    fontWeight: 800,
    lineHeight: '1rem'
  };

  return (
    <div className='note__block'>
      <div className="note__block-item">
        {deletedNotes.length ? <div className="note__list">
          {deletedNotes.map(obj => (
            <NoteItem key={obj.id} {...obj} isNoteListRow={isNoteListRow}/>
          ))}
        </div> : <h2 style={customStyles}>Корзина пустая</h2>}
      </div>
    </div>
  );
};

export default Trash;