import {
  HexUtils,
  HexViewPort,
  HexGrid,
  HexGenerator,
  Hexagon,
  Path,
} from "../../HexagonGrids";
import { useEffect, useState, useContext } from "react";
import useAlgorithms from "../Algorithms";
import "../../Styles/Mainbody.css";
import ControlPanel from "../ControlPanel";
import Legends from "../Legends";
import { GridContext } from "../../App";

const Mainbody = () => {
  const { size, panelDimension } = useContext(GridContext);
  const [rad, setRad] = useState(HexUtils.getRad(size, panelDimension));

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
  const [algo, setAlgo] = useState("dijkstra");
  const [animation, setAnimation] = useState([]);
  const [path, setPath] = useState([]);
  const [realTime, setRealTime] = useState(false);

  const runAlgo = useAlgorithms(hexagons, origin, target);

  function getViewBox() {
    const center = HexUtils.hexToPoint(hexagons[rad][rad], size);
    const x1 = center.x - panelDimension / 2;
    return `${x1} -${size + 3} ${panelDimension} ${
      (panelDimension * Math.sqrt(3)) / 2
    }`;
  }

  function executeAlgo() {
    const [ani, pa] = runAlgo(algo);
    setAnimation(ani);
    setPath(pa);
  }

  useEffect(() => {
    if (realTime) executeAlgo();
  }, [origin, target, hexagons]);

  useEffect(() => {
    setRad(HexUtils.getRad(size, panelDimension));
    setHexagons(HexGenerator.hexagonArr(rad));
    setOrigin({
      q: Math.round(rad / 2),
      r: rad,
    });
    setTarget({
      q: Math.round(rad + rad / 2),
      r: rad,
    });
  }, [panelDimension]);

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
    if (realTime) executeAlgo();
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
      clearAnimation();
    } else {
      removeWall(hexSource);
      setRemovingWall(true);
      clearAnimation();
    }
  }
  function onMouseUp(event, hexSource) {
    setMakingWall(false);
    setRemovingWall(false);
    setMovingOrigin(false);
    setMovingTarget(false);
  }
  function onClick(event, hexSource) {
    // console.log(
    //   "Clicked on " + `(${hexSource.q},${hexSource.r},${hexSource.s})`
    // );
  }
  function onDragStart(event, hexSource) {
    // console.log(
    //   "Drag started at " + `(${hexSource.q},${hexSource.r},${hexSource.s})`
    // );
  }
  function onAlgoChanged(event) {
    const value = event.target.value;
    setAlgo(value);
    // console.log("Algo changed to " + value);
  }
  return (
    <div className="Mainbody">
      <ControlPanel
        algo={algo}
        onAlgoChanged={onAlgoChanged}
        executeAlgo={executeAlgo}
        clearAnimation={clearAnimation}
        realTime={realTime}
        setRealTime={setRealTime}
      />
      <Legends />
      <div>
        <HexViewPort
          width={panelDimension}
          height={(panelDimension * Math.sqrt(3)) / 2}
          viewBox={getViewBox()}
        >
          <HexGrid size={size}>
            {hexagons.map((hex_row, q) =>
              hex_row.map((hex, r) => {
                if (!hex) return;
                let className = "";
                let animationDelay = 0;
                animation.forEach((a, i) => {
                  if (JSON.stringify(a) === JSON.stringify({ q: q, r: r })) {
                    animationDelay = i / 20;
                    className += " visited";
                  }
                });
                if (hexEqual(origin, hex)) className += " origin";
                else if (hexEqual(target, hex)) className += " target";
                else if (hex.isWall) className += " wall";

                // let animationDelay =

                return (
                  <Hexagon
                    key={`${q},${r}`}
                    className={className}
                    hex={hex}
                    animationDelay={animationDelay}
                    realTime={realTime}
                    onClick={(e, s) => onClick(e, s)}
                    onMouseEnter={(e, s) => onMouseEnter(e, s)}
                    // onMouseOver={(e, s) => onMouseOver(e, s)}
                    onMouseDown={(e, s) => onMouseDown(e, s)}
                    onMouseUp={(e, s) => onMouseUp(e, s)}
                  ></Hexagon>
                );
              })
            )}
            {path && (
              <Path
                path={path}
                animationDelay={(animation.length * 0.8) / 20}
                realTime={realTime}
              />
            )}
          </HexGrid>
        </HexViewPort>
      </div>
    </div>
  );
};

export default Mainbody;
