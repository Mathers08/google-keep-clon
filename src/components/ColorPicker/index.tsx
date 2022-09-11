import React, { FC, useState } from 'react';
import './ColorPicker.scss';
import { checkedColor, drop } from "../../assets";
import { setFormColor } from "../../redux/form/slice";
import { useAppDispatch } from "../../hooks";
import { ColorsEnum } from "../../redux/form/types";
import { setNoteColor } from "../../redux/notes/slice";
import { useSelector } from "react-redux";
import { selectForm } from "../../redux/form/selectors";
import { INote } from "../../redux/notes/types";

type ColorPickerProps = Pick<INote, 'id'>;
type ColorItem = {
  id: number;
  color: ColorsEnum
}

export const colorItems: ColorItem[] = [
  {
    id: 0,
    color: ColorsEnum.DEFAULT
  },
  {
    id: 1,
    color: ColorsEnum.RED
  },
  {
    id: 2,
    color: ColorsEnum.ORANGE
  },
  {
    id: 3,
    color: ColorsEnum.YELLOW
  },
  {
    id: 4,
    color: ColorsEnum.GREEN
  },
  {
    id: 5,
    color: ColorsEnum.BLUE_GREEN
  },
  {
    id: 6,
    color: ColorsEnum.BLUE
  },
  {
    id: 7,
    color: ColorsEnum.DARK_BLUE
  },
  {
    id: 8,
    color: ColorsEnum.PURPLE
  },
  {
    id: 9,
    color: ColorsEnum.PINK
  },
  {
    id: 10,
    color: ColorsEnum.BROWN
  },
  {
    id: 11,
    color: ColorsEnum.GREY
  },
];

const ColorPicker: FC<ColorPickerProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const { isColorBlockVisible } = useSelector(selectForm);

  const onItemClick = (id: number) => setSelectedId(id);
  const onColorBlockClick = (obj: ColorItem) => {
    if (isColorBlockVisible) {
      dispatch(setFormColor(obj.color));
    } else {
      dispatch(setNoteColor({ id, color: obj.color }));
    }
    onItemClick(obj.id);
  };

  return (
    <div className="colors">
      <img className="colors-reset-icon" src={drop} alt=""/>
      {colorItems.map((obj) => (
        <div key={obj.id} className="colors__block">
          <div
            style={{ backgroundColor: obj.color }}
            className={`colors__block-item ${obj.id === selectedId ? 'active' : ''}`}
            onClick={() => onColorBlockClick(obj)}
          />
          {obj.id === selectedId && <img className="colors__block-icon" src={checkedColor} alt=""/>}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;