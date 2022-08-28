import React, { FC } from 'react';
import './Navbar.scss';
import { archive, notifications, pen, reminders, trash } from '../../assets';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setSelectedId } from "../../redux/navbar/slice";
import { useAppDispatch } from "../../hooks";

const Navbar: FC = () => {
  const items = [
    {
      id: 1,
      imgUrl: notifications,
      name: 'Заметки',
    },
    {
      id: 2,
      imgUrl: reminders,
      name: 'Напоминания',
    },
    {
      id: 3,
      imgUrl: pen,
      name: 'Изменение ярлыков',
    },
    {
      id: 4,
      imgUrl: archive,
      name: 'Архив',
    },
    {
      id: 5,
      imgUrl: trash,
      name: 'Корзина',
    },
  ];
  const dispatch = useAppDispatch();
  const { selectedId, isNavbarHidden } = useSelector(selectNavbar);

  const onItemClick = (id: number) => dispatch(setSelectedId(id));

  return (
    <nav className="nav">
      <ul className={`nav__list ${isNavbarHidden ? 'hide_nav' : ''}`}>
        {items.map((item, index) => (
          <li key={item.name}
              className={`nav__list-item ${item.id === selectedId ? 'active' : ''}`}
              onClick={() => onItemClick(item.id)}
          >
            <img src={item.imgUrl} alt=""/>
            <span className="item-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;