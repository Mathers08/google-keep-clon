import React, { FC } from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import { ILabel } from "../redux/navbar/types";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";
import { labelOutline } from "../assets";
import { INote } from "../redux/notes/types";

interface CreatedLabelsProps {
  label: ILabel;
}

const CreatedLabels: FC<CreatedLabelsProps> = ({ label }) => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);

  const filteredLabels = notes.filter(note => note.noteLabels.find(l => l.title === label.title));
  const archivedNotes = filteredLabels.filter(note => note.isArchived);
  const deletedNotes = filteredLabels.filter(note => note.isDeleted);
  const lessNotes = filteredLabels.filter(note => !note.isDeleted && !note.isArchived && note.noteLabels.find(l => l.title === label.title));

  const createNoteItems = (notes: INote[]) => notes.map(note => (
    <NoteItem
      key={note.id}
      {...note}
      isNoteListRow={isNoteListRow}
    />
  ));

  const archiveNotesItems = createNoteItems(archivedNotes);
  const deletedNotesItems = createNoteItems(deletedNotes);
  const lessNotesItems = createNoteItems(lessNotes);

  const customStyles = {
    margin: isNoteListRow ? '0 auto' : '0 0 0 122px',
    color: '#cecece',
    fontWeight: 800,
    lineHeight: '1rem',
    fontSize: '36px'
  };

  return (
    <div className="note__block">
      {filteredLabels.length ?
        <>
          <h2 style={customStyles}>{label.title}</h2>
          {lessNotesItems.length > 0 &&
            <div className="note__block-item">
              <div className="note__list">{lessNotesItems}</div>
            </div>}
          {archiveNotesItems.length > 0 &&
            <div className="note__block-item">
              <div className="note__block-title">Архив</div>
              <div className="note__list">{archiveNotesItems}</div>
            </div>}
          {deletedNotesItems.length > 0 &&
            <div className="note__block-item">
              <div className="note__block-title">Корзина</div>
              <div className="note__list">{deletedNotesItems}</div>
            </div>}
        </> :
        <div className="note__block-item">
          <div className="emptyList">
            <img className="emptyList-img" src={labelOutline} alt="" />
            <h2 className="emptyList-text">Нет заметок с этим ярлыком</h2>
          </div>
        </div>
      }
    </div>
  );
};


export default CreatedLabels;