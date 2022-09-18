import React from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";
import { archive, trash } from "../assets";

const Trash = () => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);
  const deletedNotes = notes.filter(n => n.isDeleted);

  return (
    <div className='note__block'>
      <div className="note__block-item">
        {deletedNotes.length ? <div className="note__list">
          {deletedNotes.map(obj => (
            <NoteItem key={obj.id} {...obj} isNoteListRow={isNoteListRow}/>
          ))}
        </div> : <div className='emptyList'>
          <img className='emptyList-img' src={trash} alt=""/>
          <h2 className='emptyList-text'>В корзине ничего нет.</h2>
        </div>}
      </div>
    </div>
  );
};

export default Trash;