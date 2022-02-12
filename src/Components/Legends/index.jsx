import { useContext, useState } from "react";
import { HexUtils } from "../../HexagonGrids";
import { GridContext } from "../../App";
import "../../Styles/Mainbody.css";

const Legends = () => {
  const { size } = useContext(GridContext);
  const [points, setPoint] = useState(HexUtils.getStrHexCorners(size));
  return (
    <div className="LegendsContainer">
      <div className="Legends">
        <svg
          width={size * 2 + 2}
          height={size * 2 + 2}
          viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
          // style={{ border: "3px solid red" }}
        >
          <g className="hexagon origin">
            <polygon
              points={points}
              stroke="hsl(0, 0%, 70%)"
              strokeWidth="1"
            ></polygon>
          </g>
        </svg>
        <p className="withMargin">: Origin</p>
        <svg
          width={size * 2 + 2}
          height={size * 2 + 2}
          viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
          // style={{ border: "3px solid red" }}
        >
          <g className="target">
            <polygon
              points={points}
              stroke="hsl(0, 0%, 70%)"
              strokeWidth="1"
            ></polygon>
          </g>
        </svg>
        <p className="withMargin">: Target</p>
        <svg
          width={size * 2 + 2}
          height={size * 2 + 2}
          viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
          // style={{ border: "3px solid red" }}
        >
          <g className="hexagon">
            <polygon
              points={points}
              stroke="hsl(0, 0%, 70%)"
              strokeWidth="1"
            ></polygon>
          </g>
        </svg>
        <p>/</p>
        <svg
          width={size * 2 + 2}
          height={size * 2 + 2}
          viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
          // style={{ border: "3px solid red" }}
        >
          <g className="wall">
            <polygon
              points={points}
              stroke="hsl(0, 0%, 70%)"
              strokeWidth="1"
            ></polygon>
          </g>
        </svg>
        <p className="withMargin">: Path/Wall</p>
      </div>
      <p>Interact with grid by CLICK and DRAG</p>
    </div>
  );
};

export default Legends;
