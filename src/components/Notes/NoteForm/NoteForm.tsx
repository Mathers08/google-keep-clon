import React, { ChangeEvent, FC, useRef } from 'react';
import './NoteForm.scss';
import {v4 as uuidv4} from 'uuid';
import { archive, ArrowLeft, ArrowRight, checked, image, palette, pencil, Pin, transparent } from "../../../assets";
import { useAppDispatch, useUndoableState } from "../../../hooks";
import { INote } from "../../../redux/notes/types";
import { useSelector } from "react-redux";
import { selectForm } from "../../../redux/form/selectors";
import {
  resetForm,
  setHeaderText,
  setIsColorBlockVisible,
  setIsNotePined,
  setIsTextareaVisible
} from "../../../redux/form/slice";
import { addNote } from "../../../redux/notes/slice";
import { useOnClickOutside } from "usehooks-ts";
import Pickers from "../../Pickers";

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
  const { noteText, setNoteText, docStateIndex, docStateLastIndex, undoText, redoText } = useUndoableState(textarea);

  const handleFormSubmit = (archivedClick: boolean) => {
    const newNote: INote = {
      id: uuidv4(),
      header: headerText,
      note: noteText,
      color: formColor,
      image: formImage.toString(),
      isPinned: isNotePined,
      isSelected: false,
      isDeleted: false,
      isArchived: archivedClick,
      isColorBlockVisible: false,
      isLabelPopupVisible: false,
      noteLabels: []
    };
    if (headerText && noteText) {
      dispatch(addNote(newNote));
      dispatch(resetForm());
      setNoteText('');
    }
    dispatch(setIsColorBlockVisible(false));
    dispatch(setIsTextareaVisible(false));
  };

  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setHeaderText(e.target.value));
  const onPinClick = () => dispatch(setIsNotePined(!isNotePined));
  const onArchivedClick = () => handleFormSubmit(true);
  const onColorBlockClick = () => dispatch(setIsColorBlockVisible(!isColorBlockVisible));
  const onInputClick = () => dispatch(setIsTextareaVisible(true));
  const onCloseClick = () => {
    setNoteText('');
    dispatch(resetForm());
  };


  useOnClickOutside(formRef, () => handleFormSubmit(false));

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
          {isTextareaVisible &&
            <div className="note-icons">
              <Pin isPined={isNotePined} onPinClick={onPinClick}/>
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
            <img onClick={onArchivedClick} src={archive} alt=""/>
            <ArrowLeft undoText={undoText} canUndo={docStateIndex > 0}/>
            <ArrowRight redoText={redoText} canRedo={docStateIndex < docStateLastIndex}/>
            <img onClick={onColorBlockClick} src={palette} alt=""/>
          </div>
          <button className="note__form-btn" onClick={onCloseClick}>Сбросить</button>
        </div>}
      {isColorBlockVisible && isTextareaVisible && <Pickers id={''} position={{ top: '90%', left: '10%' }}/>}
    </form>
  );
};

export default NoteForm;