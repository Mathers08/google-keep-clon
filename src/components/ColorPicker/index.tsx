import React, { FC, useState } from 'react';
import './ColorPicker.scss';
import { checkedColor, drop } from "../../assets";
import { setFormColor } from "../../redux/note/slice";
import { useAppDispatch } from "../../hooks";

const ColorPicker: FC = () => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const onItemClick = (id: number) => setSelectedId(id);
  const colors = [
    {
      id: 0,
      color: "transparent"
    },
    {
      id: 1,
      color: "rgb(97, 74, 25)"
    },
    {
      id: 2,
      color: "rgb(99, 93, 25)"
    },
    {
      id: 3,
      color: "rgb(52, 89, 32)"
    },
    {
      id: 4,
      color: "rgb(22, 80, 75)"
    },
    {
      id: 5,
      color: "rgb(45, 85, 94)"
    },
    {
      id: 6,
      color: "rgb(30, 58, 95)"
    },
    {
      id: 7,
      color: "rgb(66, 39, 94)"
    },
    {
      id: 8,
      color: "rgb(66, 39, 94)"
    },
    {
      id: 9,
      color: "rgb(91, 34, 69)"
    },
    {
      id: 10,
      color: "rgb(68, 47, 25)"
    },
    {
      id: 11,
      color: "rgb(60, 63, 67)"
    },
  ];

  return (
    <div className="colors">
      <img className="colors-reset-icon" src={drop} alt=""/>
      {colors.map((obj) => (
        <div className="colors__block">
          <div
            key={obj.id}
            className={`colors__block-item ${obj.id === selectedId ? 'active' : ''}`}
            onClick={() => {
              dispatch(setFormColor(obj.color));
              onItemClick(obj.id);
            }}
            style={{ backgroundColor: obj.color }}
          />
          {obj.id === selectedId && <img className="colors__block-icon" src={checkedColor} alt=""/>}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;