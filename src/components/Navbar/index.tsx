import React from 'react';
import './Navbar.scss';
import { archive, labelOutline, notifications, pen, trash } from '../../assets';
import { useSelector } from "react-redux";
import { selectNavbar } from "../../redux/navbar/selectors";
import { setIsLabelBlockVisible, setSelectedId } from "../../redux/navbar/slice";
import { useAppDispatch } from "../../hooks";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Navbar = () => {
  const items = [
    {
      id: uuidv4(),
      imgUrl: archive,
      name: 'Архив',
      link: '/archive'
    },
    {
      id: uuidv4(),
      imgUrl: trash,
      name: 'Корзина',
      link: '/trash'
    },
  ];
  const dispatch = useAppDispatch();
  const { selectedId, isNavbarHidden, isLabelBlockVisible } = useSelector(selectNavbar);
  const { labels } = useSelector(selectNavbar);

  const onItemClick = (id: string) => dispatch(setSelectedId(id));
  const onLabelClick = () => dispatch(setIsLabelBlockVisible(!isLabelBlockVisible));

  return (
    <nav className="nav">
      <div className={`nav__list ${isNavbarHidden ? 'hide_nav' : ''}`}>
        <Link to="/" onClick={() => onItemClick('1')}
              className={`nav__list-item ${selectedId === '1' ? 'active' : ''}`}
        >
          <img src={notifications} alt=""/>
          <span className="item-text">Заметки</span>
        </Link>
        {labels && labels.map(label => (
          <Link to={`/label/${label.title}`} key={label.id} onClick={() => onItemClick(label.id)}
                className={`nav__list-item ${label.id === selectedId ? 'active' : ''}`}
          >
            <img src={labelOutline} alt=""/>
            <span className="item-text">{label.title}</span>
          </Link>
        ))}
        <div onClick={onLabelClick} className="nav__list-item">
          <img src={pen} alt=""/>
          <span className="item-text">Изменение ярлыков</span>
        </div>
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