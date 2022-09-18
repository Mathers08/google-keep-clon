import React, { FC, useRef } from 'react';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { useAppDispatch } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";
import './Popups.scss';
import { setIsLabelPopupVisible } from "../../redux/notes/slice";
import { INote } from "../../redux/notes/types";

type LabelPopupProps = Pick<INote, 'id'>;

const LabelPopup: FC<LabelPopupProps> = ({ id }) => {
  const { labels } = useSelector(selectNavbar);
  const labelsRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(labelsRef, () => dispatch(setIsLabelPopupVisible(id)));

  return (
    <div className="labels__popup" ref={labelsRef}>
      <h3 className="labels__popup-title">{labels.length ? 'Выберите ярлык' : 'Ярлыков нет'}</h3>
      <div className="labels__popup-list">
        {labels && labels.map((obj, index) => (
          <label className="list__item">
            {obj.title}
            <input type="checkbox" name="" id="" className="list__item-checkbox"/>
            <span key={`${obj.id}_${index}`} className="list__item-checkmark"/>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LabelPopup;