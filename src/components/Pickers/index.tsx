import React, { FC, useRef } from 'react';
import './Pickers.scss';
import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import { useOnClickOutside } from "usehooks-ts";
import { useAppDispatch } from "../../hooks";
import { setIsColorBlockVisible } from "../../redux/form/slice";
import { useSelector } from "react-redux";
import { selectForm } from "../../redux/form/selectors";
import { INote } from "../../redux/notes/types";
import { toggleNoteColorBlock } from "../../redux/notes/slice";

type PickersProps = Pick<INote, 'id'>;

const Pickers: FC<PickersProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const pickersRef = useRef(null);
  const { isColorBlockVisible } = useSelector(selectForm);
  const customStyles = {
    top: isColorBlockVisible ? '155px' : '170px',
    left: isColorBlockVisible ? '70px' : '-95px',
  };

  const handleClickOutside = () => {
    dispatch(setIsColorBlockVisible(false));
    dispatch(toggleNoteColorBlock(id));
  }
  useOnClickOutside(pickersRef, handleClickOutside);

  return (
    <div className="pickers" ref={pickersRef} style={customStyles}>
      <ColorPicker id={id}/>
      <ImagePicker id={id}/>
    </div>
  );
};

export default Pickers;