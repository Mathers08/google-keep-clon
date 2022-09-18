import React, { FC, useRef } from 'react';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { useAppDispatch } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";
import './Popups.scss';
import { setIsLabelPopupVisible } from "../../redux/notes/slice";
import { setIsChecked } from "../../redux/navbar/slice";
import { ILabel } from "../../redux/navbar/types";

type LabelPopupProps = Pick<ILabel, 'id'>;

const LabelPopup: FC<LabelPopupProps> = ({ id }) => {
  const { labels } = useSelector(selectNavbar);
  const labelsRef = useRef(null);
  const dispatch = useAppDispatch();

  const onCheckboxClick = (id: string) => dispatch(setIsChecked(id));

  useOnClickOutside(labelsRef, () => dispatch(setIsLabelPopupVisible(id)));

  return (
    <div className="labels__popup" ref={labelsRef}>
      <h3 className="labels__popup-title">{labels.length ? 'Выберите ярлык' : 'Ярлыков нет'}</h3>
      <div className="labels__popup-list">
        {labels.map((obj, index) => (
          <label className="list__item" key={obj.id}>
            {obj.title}
            <input onClick={() => onCheckboxClick(obj.id)} type="checkbox" name="" checked={obj.isLabelChecked} id=""
                   className="list__item-checkbox"/>
            <span key={`${obj.id}_${index}`} className="list__item-checkmark"/>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LabelPopup;