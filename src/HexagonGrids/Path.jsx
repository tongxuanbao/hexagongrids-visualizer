import { useState, useContext, useEffect } from "react";
import { HexUtils } from ".";
import { GridContext } from "./";

const Path = (props) => {
  const { path, animationDelay, realTime } = props;
  const { size } = useContext(GridContext);
  const [points, setPoints] = useState("");
  const [animationStyle, setAnimationStyle] = useState({});
  useEffect(() => {
    if (path.length > 0) {
      setAnimationStyle({
        // animation: `pathAnimation  ${animationDelay}s 1 forwards`,
        animationName: "pathAnimation",
        animationDuration: `${realTime ? 0 : 5}s`,
        animationDelay: `${realTime ? 0 : animationDelay}s`,
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
