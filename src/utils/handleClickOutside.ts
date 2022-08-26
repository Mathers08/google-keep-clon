import { MutableRefObject } from "react";

type PopupClick = MouseEvent & {
  path: Node[]
}

export const handleClickOutside = (e: MouseEvent, ref: MutableRefObject<any>, callback: Function) => {
  const _event = e as PopupClick;
  if (ref.current && !_event.path.includes(ref.current)) {
    callback();
  }
};