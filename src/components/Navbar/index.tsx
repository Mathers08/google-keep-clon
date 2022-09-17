import React, { FC } from 'react';
import './Navbar.scss';
import { archive, labelOutline, notifications, pen, trash } from '../../assets';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setSelectedId } from "../../redux/navbar/slice";
import { useAppDispatch } from "../../hooks";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const items = [
    {
      id: 2,
      imgUrl: pen,
      name: 'Изменение ярлыков',
      link: '/labels'
    },
    {
      id: 3,
      imgUrl: archive,
      name: 'Архив',
      link: '/archive'
    },
    {
      id: 4,
      imgUrl: trash,
      name: 'Корзина',
      link: '/trash'
    },
  ];
  const dispatch = useAppDispatch();
  const { labels, selectedId, isNavbarHidden } = useSelector(selectNavbar);

  const onItemClick = (id: number) => dispatch(setSelectedId(id));

  return (
    <nav className="nav">
      <div className={`nav__list ${isNavbarHidden ? 'hide_nav' : ''}`}>
        <Link to="/" onClick={() => onItemClick(1)}
              className={`nav__list-item ${selectedId === 1 ? 'active' : ''}`}
        >
          <img src={notifications} alt=""/>
          <span className="item-text">Заметки</span>
        </Link>
        {labels && labels.map(label => (
          <div key={label.id} onClick={() => onItemClick(label.id)}
               className={`nav__list-item ${label.id === selectedId ? 'active' : ''}`}
          >
            <img src={labelOutline} alt=""/>
            <span className="item-text">{label.title}</span>
          </div>
        ))}
        {items.map((item) => (
          <Link to={item.link} key={item.name} onClick={() => onItemClick(item.id)}
                className={`nav__list-item ${item.id === selectedId ? 'active' : ''}`}
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