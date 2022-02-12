import PropTypes from "prop-types";

const HexViewPort = (props) => {
  const { width, height, viewBox } = props;
  return (
    <svg
      className="grid"
      width={width}
      height={height}
      viewBox={viewBox}
      // style={{ border: "3px solid red" }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  );
};

HexViewPort.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  viewBox: PropTypes.string,
  children: PropTypes.node.isRequired,
};

HexViewPort.defaultProps = {
  width: 800,
  height: 600,
  viewBox: "-50 -50 100 100",
};

export default HexViewPort;
