import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  function flat_hex_corners(c, s) {
    function flat_hex_corner(center, size, i) {
      const angle_deg = 60.0 * i;
      const angle_rad = (Math.PI / 180.0) * angle_deg;
      const x = center.x + size * Math.cos(angle_rad);
      const y = center.y + size * Math.sin(angle_rad);
      return `${x.toString()},${y.toString()}`;
    }

    let hexas = "";

    for (let i = 0; i < 6; i++) {
      hexas += " " + flat_hex_corner(c, s, i);
    }

    return hexas;
  }

  useEffect(() => {
    console.log(flat_hex_corners({ x: 50, y: 50 }, 50));
  }, []);

  return (
    <>
      <svg width="100" height="100">
        <g fill="red">
          <polygon points={flat_hex_corners({ x: 50, y: 50 }, 50)} />
        </g>
      </svg>
      {/* {console.log(flat_hex_corners({ x: 50, y: 50 }, 50))} */}
      {/* <svg width="200" height="200">
        <polygon points="10,10 90,10 90,90 10,90" fill="black" />
      </svg> */}
    </>
  );
}

export default App;
