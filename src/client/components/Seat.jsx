import * as React from "react";
const Seat = (props) => {
  const uniqueId = `seat-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID

  function hexToRGBA(hex, opacity) {
    if (hex === "#000000") return "none";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const fillOpacity = 0.35;
  const fillColor = hexToRGBA(props.color, fillOpacity);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472 448.58" {...props}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_6" data-name="Layer 6">
          <path
            d="M104.29 60.29H49a43 43 0 0 0-43 43V339a43 43 0 0 0 43 43h55.29v14.79c1.14 42.35 112.1 45.79 131.71 45.79s130.57 0 131.14-45.79V382H423a43 43 0 0 0 43-43V103.29a43 43 0 0 0-43-43h-55.86V44a38 38 0 0 0-38-38H142.29a38 38 0 0 0-38 38ZM104.29 60.29V382M367.14 60.29V382"
            fill={fillColor}
            stroke={props.color}
            strokeWidth="12px"
          />
          <path
            d="M104.82 139a494.31 494.31 0 0 1 261.72.14h-.65"
            fill={fillColor}
            stroke={props.color}
            strokeWidth="12px"
          />
        </g>
      </g>
    </svg>
  );
};

export default Seat;
