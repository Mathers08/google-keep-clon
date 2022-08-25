import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { archive, arrowLeft, arrowRight, checked, image, palette, pencil, pin } from "../../assets";
import './Notes.scss';
import { handleClickOutside } from "../../utils";
import { INote } from "../../types";
import NoteList from "./NoteList";
import { useUndoableState } from '../../hooks';

interface NotesProps {
  isNoteListColumn: boolean;
}

const Notes: FC<NotesProps> = ({ isNoteListColumn }) => {
  const formRef = useRef(null);
  const [notes, setNotes] = useState<INote[]>([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [noteText, setNoteText] = useState('');

  const onInputClick = () => setToggleInput(true);
  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => setHeaderText(e.target.value);
  const onNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: INote = {
      id: Math.random(),
      header: headerText,
      note: noteText
    };
    setNotes([newNote, ...notes]);
    setHeaderText('');
    setNoteText('');
    console.log(headerText, noteText);
  };

  const {
    state,
    setState,
    docStateIndex,
    docStateLastIndex,
    undoText,
    redoText
  } = useUndoableState(noteText);

  // disabled images/buttons
  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  useEffect(() => {
    const handler = (e: MouseEvent) => handleClickOutside(e, formRef, setToggleInput);
    document.body.addEventListener('click', handler);
    return () => {
      document.body.removeEventListener('click', handler);
    };
  }, []);

  return (
    <section className="note">
      <div className="note__area">
        <form ref={formRef} onSubmit={onNoteSubmit} className="note__area-label" onClick={onInputClick}>
          <div className={`input-block ${toggleInput ? 'header-input' : ''}`}>
            <input
              value={headerText}
              onChange={onHeaderTextChange}
              type="text"
              placeholder={toggleInput ? "Введите заголовок" : "Заметка..."}
              className="note-input"
            />
          </div>
          {toggleInput && <div className="input-block textarea-block">
            <textarea
              value={state}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setState(e.target.value)}
              autoFocus={true}
              placeholder="Заметка..."
              className="note-input"
            />
            <div className="textarea-block-bottom">
              <div className="textarea-block-icons">
                <img src={palette} alt=""/>
                <img src={archive} alt=""/>
                <img src={arrowLeft} onClick={() => undoText()} alt=""/>
                <img src={arrowRight} onClick={() => redoText()} alt=""/>
              </div>
              <button className="textarea-block-btn">Закрыть</button>
            </div>
          </div>}
        </form>
        {!toggleInput ?
          <div className="note__area-icons">
            <img src={checked} alt="" className="note__area-icon"/>
            <img src={pencil} alt="" className="note__area-icon"/>
            <img src={image} alt="" className="note__area-icon"/>
          </div> :
          <div className="note__area-icons">
            <img src={pin} alt="" className="note__area-icon"/>
          </div>}
      </div>
      <NoteList notes={notes} isNoteListColumn={isNoteListColumn}/>
    </section>
  );
};

export default Notes;