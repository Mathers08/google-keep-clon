import React from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";
import { archive } from "../assets";

const Archive = () => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);
  const archivedNotes = notes.filter(n => n.isArchived);

  return (
    <div className="note__block">
      <div className="note__block-item">
        {archivedNotes.length ? <div className="note__list">
          {archivedNotes.map(obj => (
            <NoteItem key={obj.id} {...obj} isNoteListRow={isNoteListRow}/>
          ))}
        </div> : <div className='emptyList'>
          <img className='emptyList-img' src={archive} alt=""/>
          <h2 className='emptyList-text'>Здесь будут храниться архивированные заметки.</h2>
        </div>}
      </div>
    </div>
  );
};

export default Archive;