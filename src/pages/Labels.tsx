import React, { ChangeEvent, FormEvent, useState } from 'react';
import Modal from "../components/Modal";
import './Labels.scss';
import { close, edit, labelDelete, labelSolid, ok } from "../assets";
import { useAppDispatch } from "../hooks";
import { setIsLabelBlockVisible } from "../redux/navbar/slice";
import { useSelector } from "react-redux";
import { selectNavbar } from "../redux/navbar/selectors";
import { v4 as uuidv4 } from 'uuid';
import { ILabel } from "../redux/navbar/types";
import { addLabel, deleteLabel } from "../redux/notes/slice";
import { selectNotes } from "../redux/notes/selectors";

const Labels = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { isLabelBlockVisible } = useSelector(selectNavbar);
  const { labels } = useSelector(selectNotes);

  const onActiveClick = () => dispatch(setIsLabelBlockVisible(!isLabelBlockVisible));
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const onResetClick = () => setValue('');
  const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    const newLabel: ILabel = {
      id: uuidv4(),
      title: value,
      isLabelChecked: false
    };
    if (value) {
      dispatch(addLabel(newLabel));
      dispatch(setIsLabelBlockVisible(true));
      setValue('');
    }
  };

  return (
    <Modal active={isLabelBlockVisible} setActive={onActiveClick}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="label">
          <div className="label__header">Изменение ярлыков</div>
          <div className="label__main">
            <img onClick={onResetClick} src={close} alt="" className="label-icon"/>
            <input
              autoFocus
              type="text"
              className="label__main-input"
              placeholder="Создать ярлык"
              value={value}
              onChange={onInputChange}
            />
            <button onSubmit={handleSubmit} className="label__main-button">
              <img src={ok} alt="" className="label-icon"/>
            </button>
          </div>
          <div className="label__list">
            {labels && labels.map((label) => (
              <div key={label.id} className="label__list-item">
                <img src={labelSolid} alt="" className="label-icon solid-icon"/>
                <img src={labelDelete} alt="" className="label-icon delete-icon"
                  onClick={() => dispatch(deleteLabel(label.id))}/>
                <p className="label__list-item-text">{label.title}</p>
                <img src={edit} alt="" className="label-icon right-icon"/>
              </div>
            ))}
          </div>
        </div>
        <div className="form__footer">
          <button className="form__footer-btn" onClick={onActiveClick}>Готово</button>
        </div>
      </form>
    </Modal>
  );
};

export default Labels;