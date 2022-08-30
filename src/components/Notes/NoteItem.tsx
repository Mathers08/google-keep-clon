import React, { FC, useState } from 'react';
import './Notes.scss';
import { INote } from "../../redux/note/types";
import Modal from "../ModalBlock";
import NoteForm from "./NoteForm";
import { useSelector } from "react-redux";
import { selectHeader } from "../../redux/header/selectors";
import { Highlighted } from "../../utils";
import { transparent } from "../../assets";

type NoteItemProps = INote & {
  isNoteListColumn: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ header, note, color, image, isNoteListColumn }) => {
  const customStyles = {
    width: isNoteListColumn ? '600px' : '240px',
    border: image !== transparent ? `2px solid ${color}` : '',
    background: image !== transparent ? `url(${image}) right bottom / cover` : 'transparent',
    backgroundColor: image !== transparent ? '' : color
  };
  const [modalActive, setModalActive] = useState(false);
  const onItemClick = () => setModalActive(true);
  const { searchValue } = useSelector(selectHeader);

  return (
    <div className="note__list-item" style={customStyles} onClick={onItemClick}>
      <h3 className="item-header">
        <Highlighted text={header} highlight={searchValue}/>
      </h3>
      <p className="item-text">
        <Highlighted text={note} highlight={searchValue}/>
      </p>
      <Modal active={modalActive} setActive={setModalActive}>
        <NoteForm/>
      </Modal>
    </div>
  );
};

export default NoteItem;