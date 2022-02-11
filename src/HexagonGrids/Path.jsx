import { useState, useContext, useEffect } from "react";
import { HexUtils } from ".";
import { GridContext } from "./";

const Path = (props) => {
  const { path } = props;
  const { size } = useContext(GridContext);
  const [points, setPoints] = useState("");
  useEffect(() => {
    setPoints(HexUtils.strPathToPoints(path, size));
  }, [path]);
  return <path className="path" d={points} />;
};

export default Path;
