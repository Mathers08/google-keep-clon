import React, { ChangeEvent, FC, useRef } from 'react';
import './NoteForm.scss';
import { archive, ArrowLeft, ArrowRight, checked, image, palette, pencil, Pin, transparent } from "../../../assets";
import { useAppDispatch, useUndoableState } from "../../../hooks";
import { INote } from "../../../redux/form/types";
import ColorPicker from "../../ColorPicker";
import { useSelector } from "react-redux";
import { selectForm } from "../../../redux/form/selectors";
import {
  resetForm,
  setHeaderText,
  setIsColorBlockVisible,
  setIsNotePined,
  setIsTextareaVisible
} from "../../../redux/form/slice";
import {
  addNote
} from "../../../redux/notes/slice";
import { useOnClickOutside } from "usehooks-ts";
import ImagePicker from "../../ImagePicker";
import { selectNotes } from "../../../redux/notes/selectors";

const NoteForm: FC = () => {
  const textarea = '';
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const {
    headerText,
    isColorBlockVisible,
    formColor,
    formImage,
    isNotePined,
    isTextareaVisible
  } = useSelector(selectForm);
  const { notes } = useSelector(selectNotes);
  const { noteText, setNoteText, docStateIndex, docStateLastIndex, undoText, redoText } = useUndoableState(textarea);

  const onPinClick = () => dispatch(setIsNotePined(!isNotePined));
  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setHeaderText(e.target.value));
  const onColorBlockClick = () => dispatch(setIsColorBlockVisible(!isColorBlockVisible));
  const onInputClick = () => dispatch(setIsTextareaVisible(true));
  const onResetClick = () => {
    setNoteText('');
    dispatch(resetForm());
  };

  const handleClickOutside = () => {
    const newNote: INote = {
      id: Math.random(),
      header: headerText,
      note: noteText,
      color: formColor,
      image: formImage.toString(),
      pined: isNotePined,
      isEditing: false
    };
    if (headerText && noteText) {
      dispatch(addNote(newNote));
      dispatch(setIsTextareaVisible(false));
      dispatch(resetForm());
    }
    setNoteText('');
  };

  useOnClickOutside(formRef, handleClickOutside);

  const customStyles = {
    background: `url(${formImage}) right bottom / cover`,
  };

  return (
    <form
      ref={formRef}
      style={{ backgroundColor: formColor }}
      onSubmit={e => e.preventDefault()}
      className="note__form"
      onClick={onInputClick}
    >
      <div className={`note__form-label`} style={formImage !== transparent ? customStyles : undefined}>
        <div className="title-input">
          <input
            value={headerText}
            onChange={onHeaderTextChange}
            type="text"
            placeholder={isTextareaVisible ? "Введите заголовок" : "Заметка..."}
            className="note-input"
          />
          {isTextareaVisible ?
            <div className="note-icons">
              <Pin isPined={isNotePined} onPinClick={onPinClick}/>
            </div> :
            <div className="note-icons">
              <img src={checked} alt=""/>
              <img src={pencil} alt=""/>
              <img src={image} alt=""/>
            </div>
          }
        </div>
        {isTextareaVisible &&
          <div className="text-input">
            <textarea
              value={noteText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNoteText(e.target.value)}
              autoFocus
              placeholder="Заметка..."
              className="note-input"
            />
          </div>}
      </div>

      {isTextareaVisible &&
        <div className="note__form-tools">
          <div className="tools-icons">
            <img src={archive} alt=""/>
            <ArrowLeft undoText={undoText} canUndo={docStateIndex > 0}/>
            <ArrowRight redoText={redoText} canRedo={docStateIndex < docStateLastIndex}/>
            <img onClick={onColorBlockClick} src={palette} alt=""/>
          </div>
          <button className="note__form-btn" onClick={onResetClick}>Сбросить</button>
        </div>}
      {isColorBlockVisible && isTextareaVisible &&
        <div className="pickers">
          <ColorPicker/>
          <ImagePicker/>
        </div>
      }
    </form>
  );
};

export default NoteForm;