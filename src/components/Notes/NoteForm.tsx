import React, { ChangeEvent, FC, useRef } from 'react';
import { archive, ArrowLeft, ArrowRight, checked, image, palette, pencil, Pin } from "../../assets";
import { useAppDispatch, useUndoableState } from "../../hooks";
import { INote } from "../../redux/note/types";
import ColorPicker from "../ColorPicker";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/note/selectors";
import {
  addNote,
  resetForm,
  setHeaderText,
  setIsColorBlockVisible,
  setIsNotePined,
  setIsTextareaVisible
} from "../../redux/note/slice";
import { useOnClickOutside } from "usehooks-ts";
import ImagePicker from "../ImagePicker";

const NoteForm: FC = () => {
  const textarea = '';
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const { headerText, isColorBlockVisible, formColor, isNotePined, isTextareaVisible } = useSelector(selectNote);
  const { noteText, setNoteText, docStateIndex, docStateLastIndex, undoText, redoText } = useUndoableState(textarea);

  const onPinClick = () => dispatch(setIsNotePined(!isNotePined));
  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setHeaderText(e.target.value));
  const onInputClick = () => dispatch(setIsTextareaVisible(true));
  const onColorBlockClick = () => dispatch(setIsColorBlockVisible(!isColorBlockVisible));
  const onCloseClick = () => dispatch(setIsTextareaVisible(false));

  const handleClickOutside = () => {
    const newNote: INote = {
      id: Math.random(),
      header: headerText,
      note: noteText,
      color: formColor,
      pined: isNotePined
    };
    if (headerText && noteText) {
      dispatch(addNote(newNote));
      dispatch(resetForm());
    }
    setNoteText('');
  };
  useOnClickOutside(formRef, handleClickOutside);

  return (
    <form
      ref={formRef}
      style={{ backgroundColor: formColor }}
      onSubmit={e => e.preventDefault()}
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
            {isTextareaVisible && <button className="note__area-btn" onClick={onCloseClick}>Закрыть</button>}
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
      {isColorBlockVisible && isTextareaVisible &&
        <div className='pickers'>
          <ColorPicker/>
          <ImagePicker/>
        </div>
      }
    </form>
  );
};

export default NoteForm;