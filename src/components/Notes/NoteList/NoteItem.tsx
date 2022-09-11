import React, { FC, useState } from 'react';
import './NoteList.scss';
import { INote } from "../../../redux/notes/types";
import { useSelector } from "react-redux";
import { selectHeader } from "../../../redux/header/selectors";
import { Highlighted } from "../../../utils";
import { archive, note_trash, palette, Pin, transparent } from "../../../assets";
import { useAppDispatch } from "../../../hooks";
import { deleteNote, toggleNoteColorBlock, togglePinned } from "../../../redux/notes/slice";
import Pickers from "../../Pickers";
import alertConfirm, { Button } from "react-alert-confirm";

type NoteItemProps = INote & {
  isNoteListRow: boolean;
}

const NoteItem: FC<NoteItemProps> = ({
                                       id,
                                       header,
                                       note,
                                       color,
                                       image,
                                       isPinned,
                                       isEditing,
                                       isColorBlockVisible,
                                       isNoteListRow
                                     }) => {
  const customStyles = {
    item: {
      width: isNoteListRow ? '600px' : '240px',
      border: image !== transparent ? `2px solid ${color}` : '',
      background: image !== transparent ? `url(${image}) right bottom / cover` : 'transparent',
      backgroundColor: image !== transparent ? '' : color
    },
    tools: {
      width: isNoteListRow ? '595px' : '281px',
    }
  };
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectHeader);
  const [modalActive, setModalActive] = useState(false);

  const onPinClick = () => dispatch(togglePinned(id));
  const onColorBlockClick = () => dispatch(toggleNoteColorBlock(id));
  const onItemClick = () => setModalActive(true);
  const onDeleteClick = () => dispatch(deleteNote(id));
  const handleClickCustomAlert = async () => {
    await alertConfirm({
      maskClosable: true,
      title: "Вы уверены, что хотите удалить замету?",
      style: { borderRadius: '9px' },
      footer(dispatch) {
        return (
          <>
            <Button onClick={() => dispatch("cancel")}>
              Отмена
            </Button>
            <Button onClick={() => {
              onDeleteClick();
              dispatch("cancel");
            }} styleType="danger">
              Удалить
            </Button>
          </>
        );
      },
    });
  };

  return (
    <div className="note__list-item" style={customStyles.item} onClick={onItemClick}>
      <h3 className="item-header">
        <Highlighted text={header} highlight={searchValue}/>
      </h3>
      <p className="item-text">
        <Highlighted text={note} highlight={searchValue}/>
      </p>
      {/* <Modal active={modalActive} setActive={setModalActive}>
        <NoteForm/>
      </Modal>*/}
      <div className="note__item-tools" style={customStyles.tools}>
        <div className="tools__icons-pin">
          <Pin isPined={isPinned} onPinClick={onPinClick}/>
        </div>
        <div className="tools__icons-less">
          <img src={archive} alt=""/>
          <img src={palette} alt="" onClick={onColorBlockClick}/>
          <img src={note_trash} alt="" onClick={handleClickCustomAlert}/>
        </div>
      </div>
      {isColorBlockVisible && <Pickers id={id}/>}
    </div>
  );
};

export default NoteItem;