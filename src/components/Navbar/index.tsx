import React, { FC, useState } from 'react';
import './Navbar.scss';
import { pencil, reminders, notes, archive, trash } from '../../assets';

interface NavbarProps {
  hideNavbar: boolean;
}

const Navbar: FC<NavbarProps> = ({ hideNavbar }) => {
  const [selectedId, setSelectedId] = useState(1);
  const onItemClick = (id: number) => setSelectedId(id);
  const items = [
    {
      id: 1,
      imgUrl: notes,
      name: 'Заметки',
    },
    {
      id: 2,
      imgUrl: reminders,
      name: 'Напоминания',
    },
    {
      id: 3,
      imgUrl: pencil,
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

  return (
    <nav className="nav">
      <ul className={`nav__list ${hideNavbar ? 'hide_nav' : ''}`}>
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