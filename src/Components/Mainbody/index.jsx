import {
  HexViewPort,
  HexGrid,
  HexGenerator,
  Hexagon,
} from "../../HexagonGrids";
import { useEffect, useState } from "react";

const Mainbody = () => {
  const size = 20;
  const [rad, setRad] = useState(10);
  const [hexagons, setHexagons] = useState(HexGenerator.hexagonArr(rad));
  const [origin, setOrigin] = useState(hexagons[rad / 2][rad]);
  const [destination, setDestination] = useState(hexagons[rad + rad / 2][rad]);
  const [makingWall, setMakingWall] = useState(false);
  // const hexagons = HexGenerator.rectangle(20, 10);

  function onMouseEnter(event, hexSource) {
    if (makingWall) {
      const newHexagons = JSON.parse(JSON.stringify(hexagons));
      newHexagons[hexSource.q][hexSource.r].isWall = true;
      setHexagons(newHexagons);
    }
  }
  function onMouseDown(event, hexSource) {
    if (!hexSource.isWall) setMakingWall(true);
  }
  function onMouseUp(event, hexSource) {
    setMakingWall(false);
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
          {hexagons.map((hex_row, r) =>
            hex_row.map((hex, q) => {
              if (!hex) return;
              let fill = "hsl(60, 10%, 95%)";
              if (hex == origin) fill = "hsl(60, 100%, 50%)";
              if (hex == destination) fill = "hsl(200, 50%, 80%)";
              if (hex.isWall) fill = "hsl(0, 20%, 70%)";
              return (
                <Hexagon
                  key={`${q},${r}`}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={fill}
                  onClick={(e, s) => onClick(e, s)}
                  onMouseEnter={(e, s) => onMouseEnter(e, s)}
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
