import { Dispatch, MutableRefObject, SetStateAction } from "react";

type PopupClick = MouseEvent & {
  path: Node[]
}

export const handleClickOutside = (e: MouseEvent, ref: MutableRefObject<any>, func: Dispatch<SetStateAction<any>>) => {
  const _event = e as PopupClick;
  if (ref.current && !_event.path.includes(ref.current)) {
    func(false);
  }
};