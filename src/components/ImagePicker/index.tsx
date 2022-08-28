import React, { FC, useState } from 'react';
import './ImagePicker.scss';
import { checkedColor, drop, no_image } from "../../assets";
import { useAppDispatch } from "../../hooks";
import { ImagesEnum } from "../../redux/note/types";
import { setFormImage } from "../../redux/note/slice";

type ImageItem = {
  id: number;
  image: ImagesEnum
}

export const imageItems: ImageItem[] = [
  {
    id: 1,
    image: ImagesEnum.PRODUCTS
  },
  {
    id: 2,
    image: ImagesEnum.EAT
  },
  {
    id: 3,
    image: ImagesEnum.MUSIC
  },
  {
    id: 4,
    image: ImagesEnum.RECIPES
  },
  {
    id: 5,
    image: ImagesEnum.NOTES
  },
  {
    id: 6,
    image: ImagesEnum.PLACES
  },
  {
    id: 7,
    image: ImagesEnum.TRAVELS
  },
  {
    id: 8,
    image: ImagesEnum.VIDEO
  },
  {
    id: 9,
    image: ImagesEnum.CELEBRATION
  }
];

const ImagePicker: FC = () => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const onItemClick = (id: number) => setSelectedId(id);

  return (
    <div className="images">
      <img className="images-reset-icon" src={no_image} alt=""/>
      {imageItems.map((obj) => (
        <div key={obj.id} className="images__block">
          <img
            src={(obj.image).toString()} alt=""
            className={`images__block-item ${obj.id === selectedId ? 'active' : ''}`}
            onClick={() => {
              dispatch(setFormImage(obj.image));
              onItemClick(obj.id);
            }}
          />
          {obj.id === selectedId && <img className="images__block-icon" src={checkedColor} alt=""/>}
        </div>
      ))}
    </div>
  );
};

export default ImagePicker;