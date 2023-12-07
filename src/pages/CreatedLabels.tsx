import React, { FC } from 'react';
import '../components/Notes/NoteList/NoteList.scss';
import { useSelector } from "react-redux";
import { selectNotes } from "../redux/notes/selectors";
import { ILabel } from "../redux/navbar/types";
import NoteItem from "../components/Notes/NoteList/NoteItem";
import { selectHeader } from "../redux/header/selectors";
import { labelOutline } from "../assets";

interface CreatedLabelsProps {
  label: ILabel;
}

const CreatedLabels: FC<CreatedLabelsProps> = ({ label }) => {
  const { notes } = useSelector(selectNotes);
  const { isNoteListRow } = useSelector(selectHeader);

  // Todo сделать для архивированных заметок отдельный список как с закрепленными
  // const nonArchivedNotes = notes.filter(note => !note.isArchived);
  const nonDeletedNotes = notes.filter(note => !note.isDeleted);
  const filteredLabels = nonDeletedNotes.filter(note => note.noteLabels.find(l => l.title === label.title));

  return (
    <div className="note__block">
      <div className="note__block-item">
        <div className="note__list">
          {filteredLabels.length ? filteredLabels.map(note => (
            <NoteItem
              key={note.id}
              {...note}
              isNoteListRow={isNoteListRow}
            />
          )) : <div className="emptyList">
            <img className="emptyList-img" src={labelOutline} alt="" />
            <h2 className="emptyList-text">Нет заметок с этим ярлыком</h2>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CreatedLabels;