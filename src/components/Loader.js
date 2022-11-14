import React from "react";

function Loader({ size = "40" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "rgb(255, 255, 255)",
        display: "block",
        shapeRendering: "auto",
      }}
      width={size + "px"}
      height={size + "px"}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.4074074074074074s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(30 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.37037037037037035s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(60 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.2962962962962963s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.25925925925925924s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(150 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.2222222222222222s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.18518518518518517s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(210 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.14814814814814814s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.1111111111111111s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.07407407407407407s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(300 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="-0.037037037037037035s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(330 50 50)">
        <rect x={47} y={24} rx={3} ry={6} width={6} height={12} fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="0.4444444444444444s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      {/* [ldio] generated by https://loading.io/ */}
    </svg>
  );
}

export default Loader;
