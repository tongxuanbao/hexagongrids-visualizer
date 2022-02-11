import { useState, useContext, useEffect } from "react";
import { HexUtils } from ".";
import { GridContext } from "./";

const Path = (props) => {
  const { path, animationDelay } = props;
  const { size } = useContext(GridContext);
  const [points, setPoints] = useState("");
  const [animationStyle, setAnimationStyle] = useState({});
  useEffect(() => {
    if (path.length > 0) {
      setAnimationStyle({
        // animation: `pathAnimation  ${animationDelay}s 1 forwards`,
        animationName: "pathAnimation",
        animationDuration: "5s",
        animationDelay: `${animationDelay}s`,
        animationIterationCount: "1",
        animationFillMode: "forwards",
      });
    } else {
      setAnimationStyle({});
    }
    setPoints(HexUtils.strPathToPoints(path, size));
  }, [path]);
  return <path className="path" d={points} style={animationStyle} />;
};

export default Path;
