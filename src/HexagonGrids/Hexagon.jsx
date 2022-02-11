import PropTypes from "prop-types";
import { useContext, useState } from "react";
import HexUtils from "./HexUtils";
import Hex from "./Models/Hex";
import { GridContext } from "./";

const Hexagon = (props) => {
  const { hex, className, animationDelay } = props;
  const { size } = useContext(GridContext);
  const [points, setPoint] = useState(HexUtils.getStrHexCorners(size));
  const [translation, setTranslation] = useState(
    HexUtils.hexToPoint(hex, size)
  );

  function onMouseEnter(e) {
    if (props.onMouseEnter) {
      props.onMouseEnter(e, hex);
    }
  }

  function onMouseDown(e) {
    if (props.onMouseDown) {
      props.onMouseDown(e, hex);
    }
  }

  function onMouseUp(e) {
    if (props.onMouseUp) {
      props.onMouseUp(e, hex);
    }
  }

  function onClick(e) {
    if (props.onClick) {
      props.onClick(e, hex);
    }
  }

  function onDragStart(e) {
    if (props.onDragStart) {
      props.onDragStart(e, hex);
    }
  }

  return (
    <g
      className="hexagon"
      // transform={`translate(${pixel.x}, ${pixel.y})`}
      draggable="true"
      onMouseEnter={(e) => onMouseEnter(e)}
      // onMouseOver={(e) => onMouseOver(e)}
      // onMouseLeave={(e) => onMouseLeave(e)}
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={(e) => onMouseUp(e)}
      onClick={(e) => onClick(e)}
      onDragStart={(e) => onDragStart(e)}
      // onDragEnd={(e) => this.onDragEnd(e)}
      onDragOver={(e) => this.onDragOver(e)}
      // onDrop={(e) => this.onDrop(e)}
    >
      <g
        className={className}
        transform={`translate(${translation.toString()})`}
        style={{ transitionDelay: `${animationDelay}s` }}
      >
        <polygon
          points={points}
          // fill={fill}
          stroke="hsl(0, 0%, 70%)"
          strokeWidth="1"
        ></polygon>
        {props.children}
      </g>
    </g>
  );
};

Hexagon.callpropTypes = {
  q: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  s: PropTypes.number.isRequired,
  fill: PropTypes.string,
  cellStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  data: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  children: PropTypes.node,
};

export default Hexagon;
