import React, { FC } from 'react';
import './Navbar.scss';
import { archive, notifications, pen, reminders, trash } from '../../assets';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setSelectedId } from "../../redux/navbar/slice";
import { useAppDispatch } from "../../hooks";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const items = [
    {
      id: 1,
      imgUrl: notifications,
      name: 'Заметки',
      link: '/'
    },
    {
      id: 2,
      imgUrl: reminders,
      name: 'Напоминания',
      link: '/reminders'
    },
    {
      id: 3,
      imgUrl: pen,
      name: 'Изменение ярлыков',
      link: '/'
    },
    {
      id: 4,
      imgUrl: archive,
      name: 'Архив',
      link: '/archive'
    },
    {
      id: 5,
      imgUrl: trash,
      name: 'Корзина',
      link: '/trash'
    },
  ];
  const dispatch = useAppDispatch();
  const { selectedId, isNavbarHidden } = useSelector(selectNavbar);

  const onItemClick = (id: number) => dispatch(setSelectedId(id));

  return (
    <nav className="nav">
      <div className={`nav__list ${isNavbarHidden ? 'hide_nav' : ''}`}>
        {items.map((item) => (
          <Link to={item.link} key={item.name}
                className={`nav__list-item ${item.id === selectedId ? 'active' : ''}`}
                onClick={() => onItemClick(item.id)}
          >
            <img src={item.imgUrl} alt=""/>
            <span className="item-text">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;