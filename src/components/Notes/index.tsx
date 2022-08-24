import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { archive, arrowLeft, arrowRight, checked, image, palette, pencil, pin } from "../../assets";
import './Notes.scss';
import NoteItem from "./NoteItem";
import { handleClickOutside } from "../../utils/handleClickOutside";
import { INote } from "../../types/note";

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
  const onNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNoteText(e.target.value);
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
            <input value={headerText}
                   onChange={onHeaderTextChange}
                   type="text"
                   placeholder={toggleInput ? "Введите заголовок" : "Заметка..."}
                   className="note-input"
            />
          </div>
          {toggleInput && <div className="input-block textarea-block">
            <textarea value={noteText}
                      onChange={onNoteTextChange}
                      autoFocus={true}
                      placeholder="Заметка..."
                      className="note-input"
            />
            <div className="textarea-block-bottom">
              <div className="textarea-block-icons">
                <img src={palette} alt=""/>
                <img src={archive} alt=""/>
                <img src={arrowLeft} alt=""/>
                <img src={arrowRight} alt=""/>
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
      <div className={`${isNoteListColumn ? 'note__list' : 'note__columnList'}`}>
        {notes.map((note, index) => (
          <NoteItem key={`${note} + ${index}`} {...note} isNoteListColumn={isNoteListColumn}/>
        ))}
      </div>
    </section>
  );
};

export default Notes;