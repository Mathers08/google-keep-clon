import React, { FC, useState } from 'react';
import './Notes.scss';
import { INote } from "../../types";
import NoteList from "./NoteList"
import NoteForm from "./NoteForm";

interface NotesProps {
  isNoteListColumn: boolean;
}

const Notes: FC<NotesProps> = ({ isNoteListColumn }) => {
  const [isPined, setIsPined] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);
  const [pinedNotes, setPinedNotes] = useState<INote[]>([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [formColor, setFormColor] = useState('rgb(32, 33, 36)');

  return (
    <section className="note">
      <div className="note__area">
        <NoteForm
          isPined={isPined}
          setIsPined={setIsPined}
          notes={notes}
          setNotes={setNotes}
          pinedNotes={pinedNotes}
          setPinedNotes={setPinedNotes}
          formColor={formColor}
          setFormColor={setFormColor}
          toggleInput={toggleInput}
          setToggleInput={setToggleInput}
        />
        {toggleInput && <button className="note__area-btn">Закрыть</button>}
      </div>
      <NoteList
        notes={notes}
        pinedNotes={pinedNotes}
        isNoteListColumn={isNoteListColumn}
      />
    </section>
  );
};

export default Notes;