import React, { useRef } from 'react';
import { settingsItems } from "../../redux/header/types";
import { useAppDispatch } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";
import { setIsSettingsPopupVisible } from "../../redux/header/slice";
import './Popups.scss';

const SettingsPopup = () => {
  const settingsRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(settingsRef, () => dispatch(setIsSettingsPopupVisible(false)));

  return (
    <div className="settings__popup" ref={settingsRef}>
      <ul>
        {settingsItems && settingsItems.map((obj, index) => (
          <li key={`${obj.id}_${index}`}>{obj.item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPopup;