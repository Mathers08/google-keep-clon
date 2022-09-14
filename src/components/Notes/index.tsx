import React, { FC } from 'react';
import './Notes.scss';
import NoteList from "./NoteList/NoteList";
import NoteForm from "./NoteForm/NoteForm";
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";

const Notes: FC = () => {
  const { searchValue } = useSelector(selectHeader);

  return (
    <section className="note">
      <div className="note__area">
        {!searchValue &&  <NoteForm/>}
      </div>
      <NoteList/>
    </section>
  );
};

export default Notes;