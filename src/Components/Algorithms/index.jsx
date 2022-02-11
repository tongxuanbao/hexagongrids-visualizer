import { useState } from "react";

const NEIGHBORS = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

const useAlgorithms = (hexagons, origin, target) => {
  // const [animation, setAnimation] = useState([]);
  // const [path, setPath] = useState([]);

  let animation = [];
  let path = [];

  function dijkstra() {
    let ani = [];
    let pa = [];
    let len = hexagons.length;
    let d = Array.from(Array(len), () => new Array(len));
    let isMarked = Array.from(Array(len), () => new Array(len));
    let p = Array.from(Array(len), () => new Array(len));
    const INFI = len * len + len;

    // Setup
    for (let q = 0; q < len; q++) {
      for (let r = 0; r < len; r++) {
        d[q][r] = INFI; // Infinite;
      }
    }
    d[origin.q][origin.r] = 0;
    p[origin.q][origin.r] = origin;

    // Run the algorithms
    while (true) {
      let v = { q: null, r: null };
      let dis = INFI;
      for (let q = 0; q < len; q++) {
        for (let r = 0; r < len; r++) {
          let hexa = hexagons[q][r];
          if (!hexagons[q][r]) continue;
          if (hexagons[q][r].isWall) continue;
          if (!isMarked[q][r] && d[q][r] <= dis) {
            dis = d[q][r];
            v = { q: q, r: r };
          }
        }
      }
      if (
        JSON.stringify(v) === JSON.stringify(target) ||
        v.q === null ||
        dis === INFI
      )
        break;
      isMarked[v.q][v.r] = true;
      if (v !== origin) ani.push(v);
      for (let i = 0; i < NEIGHBORS.length; i++) {
        const nb = NEIGHBORS[i];
        const to = { q: v.q + nb.q, r: v.r + nb.r };
        if (to.q < 0 || to.q >= len || to.r < 0 || to.r >= len) continue;
        let hexa = hexagons[to.q][to.r];
        if (!hexagons[to.q][to.r]) continue;
        if (d[v.q][v.r] + 1 < d[to.q][to.r]) {
          p[to.q][to.r] = v;
          d[to.q][to.r] = d[v.q][v.r] + 1;
        }
      }
    }
    if (d[target.q][target.r] < INFI) {
      let v = target;
      while (JSON.stringify(v) !== JSON.stringify(origin)) {
        pa.push(v);
        v = p[v.q][v.r];
      }
      pa.push(v);
    }
    ani.shift();
    return [ani, pa];
  }

  function runAlgo(algo) {
    let ani, pa;

    if (algo === "dijkstra") return dijkstra();
    // setAnimation(ani);
    // setPath(pa);
    // animation = ani;
    // path = pa;
  }

  // return [animation, path, runAlgo];
  return runAlgo;
};

export default useAlgorithms;
