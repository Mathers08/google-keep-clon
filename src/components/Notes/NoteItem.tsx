import React, { FC, useState } from 'react';
import './Notes.scss';
import { INote } from "../../types";
import Modal from "../ModalBlock";
import NoteForm from "./NoteForm";

type NoteItemProps = INote & {
  isNoteListColumn: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ header, note, color, pined, isNoteListColumn }) => {
  const customStyles = {
    width: isNoteListColumn ? '600px' : '240px',
    backgroundColor: color
  };
  const [modalActive, setModalActive] = useState(false);
  const onItemClick = () => setModalActive(true);

  return (
    <div className="note__list-item" style={customStyles} onClick={onItemClick}>
      <h3 className="item-header">{header}</h3>
      <p className="item-text">{note}</p>
      <Modal active={modalActive} setActive={setModalActive}>
        <NoteForm
          isPined={pined}
          setIsPined={() => {}}
          notes={[]}
          setNotes={() => {}}
          pinedNotes={[]}
          setPinedNotes={() => {}}
          formColor={color}
          setFormColor={() => {}}
          toggleInput={true}
          setToggleInput={() => {}}
        />
      </Modal>
    </div>
  );
};

export default NoteItem;