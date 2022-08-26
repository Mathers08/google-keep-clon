import React, { FC, useState } from 'react';
import './Notes.scss';
import { INote } from "../../types";
import NoteList from "./NoteList"
import NoteForm from "./NoteForm";

interface NotesProps {
  isNoteListColumn: boolean;
}

const Notes: FC<NotesProps> = ({ isNoteListColumn }) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [formColor, setFormColor] = useState('rgb(32, 33, 36)');

  return (
    <section className="note">
      <div className="note__area">
        <NoteForm
          notes={notes}
          formColor={formColor}
          setFormColor={setFormColor}
          toggleInput={toggleInput}
          setNotes={setNotes}
          setToggleInput={setToggleInput}
        />
        {toggleInput && <button className="note__area-btn">Закрыть</button>}
      </div>
      <NoteList
        notes={notes}
        isNoteListColumn={isNoteListColumn}
      />
    </section>
  );
};

export default Notes;