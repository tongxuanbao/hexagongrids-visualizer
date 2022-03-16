import { useState } from "react";

const HexLogic = () => {
  const [hexagons, setHexagons] = useState(HexGenerator.hexagonArr(10));
  const [origin, setOrigin] = useState({ q: 0, r: 0 });
  const [target, setTarget] = useState({ q: 1, r: 1 });

  function setWall(hexagon, value) {
    const newHexagons = JSON.parse(JSON.stringify(hexagons));
    newHexagons[hexagon.q][hexagon.r].isWall = value;
    setHexagons(newHexagons);
  }

  return { hexagons, setOrigin, setTarget, setWall };
};

export default HexLogic;
