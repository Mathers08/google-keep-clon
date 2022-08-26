import React, { FC } from 'react';

interface PinProps {
  isPined: boolean;
  onPinClick: () => void;
}

const Pin: FC<PinProps> = ({ isPined, onPinClick }) => {
  const lineCoordinates = [
    {
      x1: "128", x2: "128",
      y1: "176", y2: "240"
    },
    {
      x1: "64", x2: "192",
      y1: "40", y2: "40"
    },
    {
      x1: "40", x2: "216",
      y1: "176", y2: "176"
    },
    {
      x1: "56", x2: "80",
      y1: "176", y2: "40"
    },
    {
      x1: "176", x2: "200",
      y1: "40", y2: "176"
    },
  ];

  return (
    <svg onClick={onPinClick} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill={isPined ? 'white' : 'none'} height="120" width="120" x="65" y="50"/>
      {lineCoordinates.map(lines => (
        <line
          key={lines.x1 + lines.y2} fill="none"
          stroke={isPined ? "white" : "rgb(190, 190, 191)"} strokeLinecap="round"
          strokeLinejoin="round" strokeWidth="24"
          x1={lines.x1} x2={lines.x2}
          y1={lines.y1} y2={lines.y2}
        />
      ))}
    </svg>
  );
};

export default Pin;