import React, { FC } from 'react';
import './Notes.scss';
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/note/selectors";

const Notes: FC = () => {
  const { isTextareaVisible } = useSelector(selectNote);

  return (
    <section className="note">
      <div className="note__area">
        <NoteForm/>
        {isTextareaVisible && <button className="note__area-btn">Закрыть</button>}
      </div>
      <NoteList/>
    </section>
  );
};

export default Notes;