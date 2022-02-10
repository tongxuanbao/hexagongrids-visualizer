import {
  HexViewPort,
  HexGrid,
  HexGenerator,
  Hexagon,
} from "../../HexagonGrids";
import { useState } from "react";

const Mainbody = () => {
  const size = 20;
  const [rad, setRad] = useState(10);

  const [hexagons, setHexagons] = useState(HexGenerator.hexagonArr(rad));
  const [origin, setOrigin] = useState({
    q: Math.round(rad / 2),
    r: rad,
  });
  const [target, setTarget] = useState({
    q: Math.round(rad + rad / 2),
    r: rad,
  });

  const [makingWall, setMakingWall] = useState(false);
  const [removingWall, setRemovingWall] = useState(false);
  const [movingOrigin, setMovingOrigin] = useState(false);
  const [movingTarget, setMovingTarget] = useState(false);

  function hexEqual(position, hex) {
    return position.q === hex.q && position.r === hex.r;
  }

  function makeWall(hexSource) {
    const newHexagons = JSON.parse(JSON.stringify(hexagons));
    newHexagons[hexSource.q][hexSource.r].isWall = true;
    setHexagons(newHexagons);
  }

  function removeWall(hexSource) {
    const newHexagons = JSON.parse(JSON.stringify(hexagons));
    newHexagons[hexSource.q][hexSource.r].isWall = false;
    setHexagons(newHexagons);
  }

  function onMouseEnter(event, hexSource) {
    if (makingWall) makeWall(hexSource);
    if (removingWall) removeWall(hexSource);
    if (movingOrigin) setOrigin({ q: hexSource.q, r: hexSource.r });
    if (movingTarget) setTarget({ q: hexSource.q, r: hexSource.r });
  }

  // function onMouseOver(event, hexSource) {}

  function onMouseDown(event, hexSource) {
    if (hexEqual(origin, hexSource)) {
      setMovingOrigin(true);
    } else if (hexEqual(target, hexSource)) {
      setMovingTarget(true);
    } else if (!hexSource.isWall) {
      makeWall(hexSource);
      setMakingWall(true);
    } else {
      removeWall(hexSource);
      setRemovingWall(true);
    }
  }
  function onMouseUp(event, hexSource) {
    setMakingWall(false);
    setRemovingWall(false);
    setMovingOrigin(false);
    setMovingTarget(false);
  }
  function onClick(event, hexSource) {
    console.log(
      "Clicked on " + `(${hexSource.q},${hexSource.r},${hexSource.s})`
    );
  }
  function onDragStart(event, hexSource) {
    console.log(
      "Drag started at " + `(${hexSource.q},${hexSource.r},${hexSource.s})`
    );
  }
  return (
    <>
      <HexViewPort
        width={740}
        height={650}
        viewBox={`${(size * 1.5 * rad) / 2} -${size + 3} 740 650`}
      >
        <HexGrid size={size}>
          {hexagons.map((hex_row, q) =>
            hex_row.map((hex, r) => {
              if (!hex) return;
              let fill = "hsl(60, 10%, 95%)";
              if (hex.isWall) fill = "hsl(0, 20%, 70%)";
              if (hexEqual(origin, hex)) fill = "hsl(60, 100%, 50%)";
              if (hexEqual(target, hex)) fill = "hsl(200, 50%, 80%)";
              return (
                <Hexagon
                  key={`${q},${r}`}
                  hex={hex}
                  fill={fill}
                  onClick={(e, s) => onClick(e, s)}
                  onMouseEnter={(e, s) => onMouseEnter(e, s)}
                  // onMouseOver={(e, s) => onMouseOver(e, s)}
                  onMouseDown={(e, s) => onMouseDown(e, s)}
                  onMouseUp={(e, s) => onMouseUp(e, s)}
                ></Hexagon>
              );
            })
          )}
        </HexGrid>
      </HexViewPort>
    </>
  );
};

export default Mainbody;
