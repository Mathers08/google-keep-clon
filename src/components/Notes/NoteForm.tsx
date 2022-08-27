import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { archive, ArrowLeft, ArrowRight, checked, image, palette, pencil, Pin } from "../../assets";
import { useUndoableState } from "../../hooks";
import { INote } from "../../redux/note/types";
import { handleClickOutside } from "../../utils";
import ColorPicker from "../ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { selectNote } from "../../redux/note/selectors";
import { addNote, setFormColor, setIsNotePined, setTextareaVisible } from "../../redux/note/slice";

const NoteForm: FC = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const { formColor, isNotePined, isTextareaVisible } = useSelector(selectNote);
  const [isColorBlockVisible, setIsColorBlockVisible] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const textarea = '';
  const { noteText, setNoteText, docStateIndex, docStateLastIndex, undoText, redoText } = useUndoableState(textarea);

  const onPinClick = () => dispatch(setIsNotePined(!isNotePined));
  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => setHeaderText(e.target.value);
  const onInputClick = () => dispatch(setTextareaVisible(true));
  const onColorBlockClick = () => setIsColorBlockVisible(!isColorBlockVisible);
  const onNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: INote = {
      id: Math.random(),
      header: headerText,
      note: noteText,
      color: formColor,
      pined: isNotePined
    };
    setHeaderText('');
    setNoteText('');
    setIsColorBlockVisible(false);
    dispatch(addNote(newNote));
  };

  useEffect(() => {
    const callbacks = () => {
      dispatch(setTextareaVisible(false));
      setIsColorBlockVisible(false);
      dispatch(setFormColor('rgb(32, 33, 36)'));
    };
    const handler = (e: MouseEvent) => handleClickOutside(e, formRef, callbacks);
    document.body.addEventListener('click', handler);
    return () => {
      document.body.removeEventListener('click', handler);
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onNoteSubmit}
      style={{ backgroundColor: formColor }}
      className="note__area-label"
      onClick={onInputClick}
    >
      <div className={`input-block ${isTextareaVisible ? 'header-input' : ''}`}>
        <input
          value={headerText}
          onChange={onHeaderTextChange}
          type="text"
          placeholder={isTextareaVisible ? "Введите заголовок" : "Заметка..."}
          className="note-input"
        />
      </div>
      {isTextareaVisible &&
        <div className="input-block textarea-block">
          <textarea
            value={noteText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNoteText(e.target.value)}
            autoFocus
            placeholder="Заметка..."
            className="note-input"
          />
          <div className="textarea-block-bottom">
            <div className="textarea-block-icons">
              <img src={archive} alt=""/>
              <ArrowLeft undoText={undoText} canUndo={docStateIndex > 0}/>
              <ArrowRight redoText={redoText} canRedo={docStateIndex < docStateLastIndex}/>
              <img onClick={onColorBlockClick} src={palette} alt=""/>
            </div>
          </div>
        </div>}
      {isTextareaVisible ?
        <div className="note__area-icons ">
          <Pin isPined={isNotePined} onPinClick={onPinClick}/>
        </div> :
        <div className="note__area-icons">
          <img src={checked} alt=""/>
          <img src={pencil} alt=""/>
          <img src={image} alt=""/>
        </div>
      }
      {isColorBlockVisible && isTextareaVisible && <ColorPicker/>}
    </form>
  );
};

export default NoteForm;