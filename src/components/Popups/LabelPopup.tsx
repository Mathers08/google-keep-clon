import React, { FC, useRef } from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";
import './Popups.scss';
import { setIsChecked, setIsLabelPopupVisible } from "../../redux/notes/slice";
import { ILabel } from "../../redux/navbar/types";
import { selectNotes } from "../../redux/notes/selectors";
import { INote } from "../../redux/notes/types";

type LabelPopupProps = Pick<INote, 'id' | 'noteLabels'>;

const LabelPopup: FC<LabelPopupProps> = ({ id, noteLabels}) => {
  const { labels } = useSelector(selectNotes);
  const labelsRef = useRef(null);
  const dispatch = useAppDispatch();
  console.log(labels, noteLabels);

  const onCheckboxClick = (obj: ILabel) => dispatch(setIsChecked({ noteId: id, labelId: obj.id }));
  useOnClickOutside(labelsRef, () => dispatch(setIsLabelPopupVisible(id)));

  return (
    <div className="labels__popup" ref={labelsRef}>
      <h3 className="labels__popup-title">{labels.length ? 'Выберите ярлык' : 'Ярлыков нет'}</h3>
      <div className="labels__popup-list">
        {labels && labels.map(obj => (
          <label className="list__item" key={obj.id}>
            {obj.title}
            <input
              onClick={() => onCheckboxClick(obj)}
              type="checkbox"
              checked={obj.id === (noteLabels.find(l => l.id === obj.id)?.id)}
              className="list__item-checkbox"
            />
            <span className="list__item-checkmark"/>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LabelPopup;