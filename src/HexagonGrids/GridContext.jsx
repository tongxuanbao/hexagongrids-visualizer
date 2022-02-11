import { createContext } from "react";

const GridContext = createContext({
  size: 25,
  width: 740,
  height: 650,
});

export default GridContext;
// width={740}
//         height={650}
//         viewBox={`${(size * 1.5 * rad) / 2} -${size + 3} 740 650`}
