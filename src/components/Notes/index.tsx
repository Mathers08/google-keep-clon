import React, { FC } from 'react';
import './Notes.scss';
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/note/selectors";
import { useAppDispatch } from "../../hooks";
import { setIsTextareaVisible } from "../../redux/note/slice";

const Notes: FC = () => {
  const dispatch = useAppDispatch();
  const { isTextareaVisible } = useSelector(selectNote);

  const onCloseClick = () => dispatch(setIsTextareaVisible(false));

  return (
    <section className="note">
      <div className="note__area">
        <NoteForm/>
        {isTextareaVisible && <button className="note__area-btn" onClick={onCloseClick}>Закрыть</button>}
      </div>
      <NoteList/>
    </section>
  );
};

export default Notes;