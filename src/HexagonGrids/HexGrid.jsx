import PropTypes from "prop-types";
import Point from "./Models/Point";
import { createContext } from "react";
import { GridContext } from "./GridContext";

const HexGrid = (props) => {
  const { children, className, size } = props;
  return (
    <GridContext.Provider value={{ size: size }}>
      <g className={className}>{children}</g>
    </GridContext.Provider>
  );
};

HexGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  origin: PropTypes.object,
  size: PropTypes.number,
};

HexGrid.defaultProps = {
  size: 10,
};

export default HexGrid;
