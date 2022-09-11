import React, { FC, useState } from 'react';
import './Pickers.scss';
import { checkedColor, no_image } from "../../assets";
import { useAppDispatch } from "../../hooks";
import { ImagesEnum, MiniImagesEnum } from "../../redux/form/types";
import { setFormImage } from "../../redux/form/slice";
import { INote } from "../../redux/notes/types";
import { setNoteImage } from "../../redux/notes/slice";
import { useSelector } from "react-redux";
import { selectForm } from "../../redux/form/selectors";

type ImagePickerProps = Pick<INote, 'id'>;
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

const ImagePicker: FC<ImagePickerProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const { isColorBlockVisible } = useSelector(selectForm);

  const onItemClick = (id: number) => setSelectedId(id);
  const onImageBlockClick = (obj: ImageItem) => {
    if (isColorBlockVisible) {
      dispatch(setFormImage(obj.image));
    } else {
      dispatch(setNoteImage({ id, image: obj.image }));
    }
    onItemClick(obj.id);
  };

  return (
    <div className="images wrapper">
      <img className="images-reset-icon wrapper-reset-icon" src={no_image} alt=""/>
      {imageItems.map((obj) => (
        <div key={obj.id} className="images__block wrapper__block">
          <img
            src={(obj.miniImage).toString()} alt=""
            className={`images__block-item wrapper__block-item ${obj.id === selectedId ? 'active' : ''}`}
            onClick={() => onImageBlockClick(obj)}
          />
          {obj.id === selectedId &&
            <img className="images__block-icon wrapper__block-icon" src={checkedColor} alt=""/>
          }
        </div>
      ))}
    </div>
  );
};

export default ImagePicker;