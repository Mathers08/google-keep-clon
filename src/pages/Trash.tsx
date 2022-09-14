import React from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";
import { declination } from "../utils";

const Trash = () => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow, searchValue } = useSelector(selectHeader);
  const deletedNotes = notes.filter(n => n.isDeleted);

  const customStyles = {
    margin: isNoteListRow ? '0 auto' : '0 0 0 60px',
    color: '#cecece',
    fontWeight: 800,
    lineHeight: '1rem'
  };
  const totalLength = deletedNotes.length;
  const declFind = declination(totalLength, ['Найдена', 'Найдены', 'Найдено']);
  const declNote = declination(totalLength, ['заметка', 'заметки', 'заметок']);
  const foundNotesCountInfo = totalLength === 0
    ? <h2 style={customStyles}>Заметки не найдены</h2>
    : <h2 style={customStyles}>{declFind} {totalLength} {declNote}</h2>;

  return (
    <div className='note__block'>
      {searchValue && foundNotesCountInfo}
      <div className="note__block-item">
        <div className="note__list">
          {deletedNotes.map(obj => (
            <NoteItem key={obj.id} {...obj} isNoteListRow={isNoteListRow}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trash;