import {
  HexUtils,
  HexViewPort,
  HexGrid,
  HexGenerator,
  Hexagon,
  Hex,
  Path,
  GridContext,
} from "../../HexagonGrids";
import { useEffect, useState, useContext } from "react";
import useAlgorithms from "../Algorithms";
import "../../Styles/Mainbody.css";

const Mainbody = () => {
  const { size, width, height } = useContext(GridContext);
  const [rad, setRad] = useState(HexUtils.getRad(size, width));

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
  const [animation, setAnimation] = useState([]);
  const [path, setPath] = useState([]);

  const runAlgo = useAlgorithms(hexagons, origin, target);

  function executeAlgo() {
    const [ani, pa] = runAlgo("dijkstra");
    setAnimation(ani);
    setPath(pa);
  }

  function clearAnimation() {
    setAnimation([]);
    setPath([]);
  }

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
    executeAlgo();
  }

  // function onMouseOver(event, hexSource) {}

  function onMouseDown(event, hexSource) {
    if (hexEqual(origin, hexSource)) {
      setMovingOrigin(true);
      clearAnimation();
    } else if (hexEqual(target, hexSource)) {
      setMovingTarget(true);
      clearAnimation();
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
      <div>
        <button onClick={() => executeAlgo()}>Run Algorithm</button>
        <button onClick={() => clearAnimation()}>Clear Animation</button>
      </div>
      <HexViewPort
        width={740}
        height={650}
        viewBox={`${(size * 1.5 * rad) / 2} -${size + 3} 740 650`}
      >
        <HexGrid size={size}>
          {hexagons.map((hex_row, q) =>
            hex_row.map((hex, r) => {
              if (!hex) return;
              let className = "";
              if (
                animation.filter(
                  (a) => JSON.stringify(a) === JSON.stringify({ q: q, r: r })
                ).length > 0
              ) {
                className += " path";
              }

              if (hexEqual(origin, hex)) className += " origin";
              else if (hexEqual(target, hex)) className += " target";
              else if (hex.isWall) className += " wall";
              return (
                <Hexagon
                  key={`${q},${r}`}
                  className={className}
                  hex={hex}
                  onClick={(e, s) => onClick(e, s)}
                  onMouseEnter={(e, s) => onMouseEnter(e, s)}
                  // onMouseOver={(e, s) => onMouseOver(e, s)}
                  onMouseDown={(e, s) => onMouseDown(e, s)}
                  onMouseUp={(e, s) => onMouseUp(e, s)}
                ></Hexagon>
              );
            })
          )}
          {path && <Path path={path} />}
        </HexGrid>
      </HexViewPort>
    </>
  );
};

export default Mainbody;
