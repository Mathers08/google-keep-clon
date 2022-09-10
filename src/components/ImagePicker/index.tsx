import React, { FC, useState } from 'react';
import './ImagePicker.scss';
import { checkedColor, no_image } from "../../assets";
import { useAppDispatch } from "../../hooks";
import { ImagesEnum, MiniImagesEnum } from "../../redux/form/types";
import { setFormImage } from "../../redux/form/slice";

type ImageItem = {
  id: number;
  miniImage: MiniImagesEnum;
  image: ImagesEnum;
}

export const imageItems: ImageItem[] = [
  {
    id: 0,
    miniImage: MiniImagesEnum.DEFAULT,
    image: ImagesEnum.DEFAULT
  },
  {
    id: 1,
    miniImage: MiniImagesEnum.PRODUCTS,
    image: ImagesEnum.PRODUCTS
  },
  {
    id: 2,
    miniImage: MiniImagesEnum.EAT,
    image: ImagesEnum.EAT
  },
  {
    id: 3,
    miniImage: MiniImagesEnum.MUSIC,
    image: ImagesEnum.MUSIC
  },
  {
    id: 4,
    miniImage: MiniImagesEnum.RECIPES,
    image: ImagesEnum.RECIPES
  },
  {
    id: 5,
    miniImage: MiniImagesEnum.NOTES,
    image: ImagesEnum.NOTES
  },
  {
    id: 6,
    miniImage: MiniImagesEnum.PLACES,
    image: ImagesEnum.PLACES
  },
  {
    id: 7,
    miniImage: MiniImagesEnum.TRAVELS,
    image: ImagesEnum.TRAVELS
  },
  {
    id: 8,
    miniImage: MiniImagesEnum.VIDEO,
    image: ImagesEnum.VIDEO
  },
  {
    id: 9,
    miniImage: MiniImagesEnum.CELEBRATION,
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
            src={(obj.miniImage).toString()} alt=""
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