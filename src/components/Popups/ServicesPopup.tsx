import React, { useRef } from 'react';
import { servicesItems } from "../../redux/header/types";
import { useOnClickOutside } from "usehooks-ts";
import { setIsServicesPopupVisible } from "../../redux/header/slice";
import { useAppDispatch } from "../../hooks";
import './Popups.scss';

const ServicesPopup = () => {
  const servicesRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(servicesRef, () => dispatch(setIsServicesPopupVisible(false)));

  return (
    <div className="services__popup" ref={servicesRef}>
      {servicesItems && servicesItems.map((obj, index) => (
        <div className="services__popup-item" key={`${obj.id}_${index}`}>
          <a href={obj.href}><img src={obj.src} alt=""/></a>
          <p>{obj.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesPopup;