import { useMemo, useState } from "react";
import isEqual from "lodash/isEqual";

export const useUndoableState = (init: any) => {
  const [states, setStates] = useState([init]);
  const [docStateIndex, setDocStateIndex] = useState(0);
  const noteText = useMemo(() => states[docStateIndex], [states, docStateIndex]);

  const setNoteText = (value: string) => {
    if (isEqual(noteText, value)) {
      return;
    }
    const copy = states.slice(0, docStateIndex + 1);
    copy.push(value);
    setStates(copy);
    setDocStateIndex(copy.length - 1);
  };
  const undoText = (steps = 1) => {
    setDocStateIndex(Math.max(0, Number(docStateIndex) - (Number(steps) || 1)));
  };
  const redoText = (steps = 1) => {
    setDocStateIndex(Math.min(states.length - 1, Number(docStateIndex) + (Number(steps) || 1)));
  };

  return {
    noteText,
    setNoteText,
    docStateIndex,
    docStateLastIndex: states.length - 1,
    undoText,
    redoText,
  };
};