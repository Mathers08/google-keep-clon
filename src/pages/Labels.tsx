import React, { ChangeEvent, FormEvent, useState } from 'react';
import Modal from "../components/Modal";
import './Labels.scss';
import { close, edit, labelDelete, labelSolid, ok } from "../assets";
import { ILabel } from "../redux/navbar/types";
import { useAppDispatch } from "../hooks";
import { addLabel, deleteLabel } from "../redux/navbar/slice";
import { useSelector } from "react-redux";
import { selectNavbar } from "../redux/navbar/selectors";

const Labels = () => {
  const [active, setActive] = useState(true);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { labels } = useSelector(selectNavbar);

  const onActiveClick = () => setActive(!active);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLabel: ILabel = {
      id: Math.random(),
      title: value
    };
    if (value) {
      dispatch(addLabel(newLabel));
      setValue('');
    }
  };

  return (
    <Modal active={active} setActive={onActiveClick}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="label">
          <div className="label__header">Изменение ярлыков</div>
          <div className="label__main">
            <img src={close} alt="" className="label-icon"/>
            <input
              autoFocus
              type="text"
              className="label__main-input"
              placeholder="Создать ярлык"
              value={value}
              onChange={onInputChange}
            />
            <img src={ok} alt="" className="label-icon"/>
          </div>
          <div className="label__list">
            {labels && labels.map(label => (
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
          <button className="form__footer-btn">Готово</button>
        </div>
      </form>
    </Modal>
  );
};

export default Labels;