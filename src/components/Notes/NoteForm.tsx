import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { archive, ArrowLeft, ArrowRight, checked, image, palette, pencil, Pin } from "../../assets";
import { useUndoableState } from "../../hooks";
import { INote } from "../../types";
import ColorPicker from "../FormBackground/ColorPicker";
import { handleClickOutside } from "../../utils";

interface NoteFormProps {
  isPined: boolean;
  setIsPined: (isPined: boolean) => void;
  notes: INote[];
  setNotes: (notes: INote[]) => void;
  pinedNotes: INote[];
  setPinedNotes: (pinedNotes: INote[]) => void;
  formColor: string;
  setFormColor: (color: string) => void;
  toggleInput: boolean;
  setToggleInput: (toggleInput: boolean) => void;
}

const NoteForm: FC<NoteFormProps> = ({
                                       isPined,
                                       setIsPined,
                                       notes,
                                       setNotes,
                                       pinedNotes,
                                       setPinedNotes,
                                       formColor,
                                       setFormColor,
                                       toggleInput,
                                       setToggleInput
                                     }) => {
  const formRef = useRef(null);
  const [isColorBlockVisible, setIsColorBlockVisible] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const textarea = '';
  const { noteText, setNoteText, docStateIndex, docStateLastIndex, undoText, redoText } = useUndoableState(textarea);

  const onPinClick = () => setIsPined(!isPined);
  const onHeaderTextChange = (e: ChangeEvent<HTMLInputElement>) => setHeaderText(e.target.value);
  const onInputClick = () => setToggleInput(true);
  const onColorBlockClick = () => setIsColorBlockVisible(!isColorBlockVisible);
  const onNoteSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: INote = {
      id: Math.random(),
      header: headerText,
      note: noteText,
      color: formColor,
      pined: isPined
    };
    isPined ? setPinedNotes([newNote, ...pinedNotes]) : setNotes([newNote, ...notes]);
    setHeaderText('');
    setNoteText('');
    setIsColorBlockVisible(false);
    setFormColor('rgb(32, 33, 36)');
    setIsPined(false);
  };

  useEffect(() => {
    const callbacks = () => {
      setToggleInput(false);
      setIsColorBlockVisible(false);
      setFormColor('rgb(32, 33, 36)');
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
      <div className={`input-block ${toggleInput ? 'header-input' : ''}`}>
        <input
          value={headerText}
          onChange={onHeaderTextChange}
          type="text"
          placeholder={toggleInput ? "Введите заголовок" : "Заметка..."}
          className="note-input"
        />
      </div>
      {toggleInput &&
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
      {toggleInput ?
        <div className="note__area-icons ">
          <Pin isPined={isPined} onPinClick={onPinClick}/>
        </div> :
        <div className="note__area-icons">
          <img src={checked} alt=""/>
          <img src={pencil} alt=""/>
          <img src={image} alt=""/>
        </div>
      }
      {isColorBlockVisible && toggleInput &&
        <ColorPicker
          setFormColor={setFormColor}
        />
      }
    </form>
  );
};

export default NoteForm;