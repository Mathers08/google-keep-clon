import React, {FC, useState} from 'react';
import './NoteList.scss';
import {INote} from "../../../redux/form/types";
import {useSelector} from "react-redux";
import {selectHeader} from "../../../redux/header/selectors";
import {Highlighted} from "../../../utils";
import {archive, palette, Pin, transparent} from "../../../assets";
import {useAppDispatch} from "../../../hooks";
import ColorPicker from "../../ColorPicker";
import ImagePicker from "../../ImagePicker";
import {selectNotes} from "../../../redux/notes/selectors";
import {selectForm} from "../../../redux/form/selectors";
import {togglePinned} from "../../../redux/notes/slice";

type NoteItemProps = INote & {
    isNoteListColumn: boolean;
}

const NoteItem: FC<NoteItemProps> = ({id, header, note, color, image, pined, isEditing, isNoteListColumn}) => {
    const customStyles = {
        width: isNoteListColumn ? '600px' : '240px',
        border: image !== transparent ? `2px solid ${color}` : '',
        background: image !== transparent ? `url(${image}) right bottom / cover` : 'transparent',
        backgroundColor: image !== transparent ? '' : color
    };
    const dispatch = useAppDispatch();
    const {searchValue} = useSelector(selectHeader);
    const [modalActive, setModalActive] = useState(false);
    const {isColorBlockVisible} = useSelector(selectForm);
    const onPinClick = () => dispatch(togglePinned(id));

    const onItemClick = () => setModalActive(true);

    return (
        <div className="note__list-item" style={customStyles} onClick={onItemClick}>
            <h3 className="item-header">
                <Highlighted text={header} highlight={searchValue}/>
            </h3>
            <p className="item-text">
                <Highlighted text={note} highlight={searchValue}/>
            </p>
            {/* <Modal active={modalActive} setActive={setModalActive}>
        <NoteForm/>
      </Modal>*/}
            <div className="note__item-tools">
                <div className="tools__icons-pin">
                    <Pin isPined={pined} onPinClick={onPinClick}/>
                </div>
                <div className="tools__icons-less">
                    <img src={archive} alt=""/>
                    <img src={palette} alt=""/>
                </div>
            </div>
            {isColorBlockVisible &&
                <div className="pickers">
                    <ColorPicker/>
                    <ImagePicker/>
                </div>
            }
        </div>
    );
};

export default NoteItem;