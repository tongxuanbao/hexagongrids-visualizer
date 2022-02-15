import { faRulerCombined } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { HexUtils } from "../../HexagonGrids";

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

    let next = [origin];
    // Run the algorithms
    while (true) {
      if (next.length === 0) break;
      let v = next.shift();
      if (JSON.stringify(v) === JSON.stringify(target) || v.q === null) break;
      isMarked[v.q][v.r] = true;
      if (v !== origin) ani.push(v);
      for (let i = 0; i < NEIGHBORS.length; i++) {
        const nb = NEIGHBORS[i];
        const to = { q: v.q + nb.q, r: v.r + nb.r };
        if (to.q < 0 || to.q >= len || to.r < 0 || to.r >= len) continue;
        if (isMarked[to.q][to.r]) continue;
        if (!hexagons[to.q][to.r]) continue;
        if (hexagons[to.q][to.r].isWall) continue;
        if (d[v.q][v.r] + 1 < d[to.q][to.r]) {
          p[to.q][to.r] = v;
          d[to.q][to.r] = d[v.q][v.r] + 1;
          next.push(to);
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
    // ani.shift();
    return [ani, pa];
  }

  function bfs() {
    let ani = [],
      pa = [];
    let next = [origin];
    let len = hexagons.length;
    let isMarked = Array.from(Array(len), () => new Array(len));
    isMarked[origin.q][origin.r] = true;
    let p = Array.from(Array(len), () => new Array(len));
    p[origin.q][origin.r] = origin;

    while (next.length) {
      let v = next.shift();
      if (JSON.stringify(v) !== JSON.stringify(origin)) ani.push(v);
      if (JSON.stringify(v) === JSON.stringify(target)) break;
      for (let i = 0; i < NEIGHBORS.length; i++) {
        const nb = NEIGHBORS[i];
        const to = { q: v.q + nb.q, r: v.r + nb.r };
        if (to.q < 0 || to.q >= len || to.r < 0 || to.r >= len) continue;
        if (isMarked[to.q][to.r]) continue;
        if (!hexagons[to.q][to.r]) continue;
        if (hexagons[to.q][to.r].isWall) continue;
        p[to.q][to.r] = v;
        isMarked[to.q][to.r] = true;
        next.push(to);
      }
    }
    {
      let v = target;
      while (JSON.stringify(v) !== JSON.stringify(origin)) {
        pa.push(v);
        v = p[v.q][v.r];
      }
      pa.push(v);
    }

    return [ani, pa];
  }

  function dfs() {
    let ani = [],
      pa = [];
    let len = hexagons.length;
    let isMarked = Array.from(Array(len), () => new Array(len));
    let p = Array.from(Array(len), () => new Array(len));
    p[origin.q][origin.r] = origin;
    let terminate = false;

    function run(v) {
      if (JSON.stringify(v) === JSON.stringify(target)) terminate = true;
      if (terminate) return;
      if (JSON.stringify(v) !== JSON.stringify(origin)) ani.push(v);
      isMarked[v.q][v.r] = true;

      for (let i = 0; i < NEIGHBORS.length; i++) {
        const nb = NEIGHBORS[i];
        const to = { q: v.q + nb.q, r: v.r + nb.r };
        if (to.q < 0 || to.q >= len || to.r < 0 || to.r >= len) continue;
        if (isMarked[to.q][to.r]) continue;
        if (!hexagons[to.q][to.r]) continue;
        if (hexagons[to.q][to.r].isWall) continue;
        p[to.q][to.r] = v;
        run(to);
        if (terminate) return;
      }
    }

    run(origin);

    {
      let v = target;
      while (JSON.stringify(v) !== JSON.stringify(origin)) {
        pa.push(v);
        v = p[v.q][v.r];
      }
      pa.push(v);
    }

    return [ani, pa];
  }

  function astar() {
    let ani = [],
      pa = [];
    let len = hexagons.length;
    let openList = new Map([[JSON.stringify(origin), 0]]),
      closedList = new Map();
    let p = Array.from(Array(len), () => new Array(len));
    p[origin.q][origin.r] = origin;

    while (true) {
      // Find node in open list
      let vKey = null;
      let dis = len * len + len;
      let g = 0;
      openList.forEach((value, key) => {
        let hex = JSON.parse(key);
        let h = HexUtils.hex_distance(
          hexagons[hex.q][hex.r],
          hexagons[target.q][target.r]
        );
        if (value + h < dis) {
          vKey = key;
          dis = value + h;
          g = value;
        }
      });

      // Check if it's target
      if (vKey === JSON.stringify(target)) break;

      closedList.set(vKey, openList.get(vKey));
      openList.delete(vKey);

      // Process neighbors
      let v = JSON.parse(vKey);
      if (vKey !== origin) ani.push(v);
      for (let i = 0; i < NEIGHBORS.length; i++) {
        const nb = NEIGHBORS[i];
        const to = { q: v.q + nb.q, r: v.r + nb.r };
        if (to.q < 0 || to.q >= len || to.r < 0 || to.r >= len) continue;
        if (!hexagons[to.q][to.r]) continue;
        if (hexagons[to.q][to.r].isWall) continue;

        if (
          closedList.has(JSON.stringify(to)) &&
          closedList.get(JSON.stringify(to)) > g + 1
        ) {
          closedList.set(JSON.stringify(to), g + 1);
        } else if (
          openList.has(JSON.stringify(to)) &&
          openList.get(JSON.stringify(to)) > g + 1
        ) {
          openList.set(JSON.stringify(to), g + 1);
        } else if (
          !closedList.has(JSON.stringify(to)) &&
          !openList.has(JSON.stringify(to))
        ) {
          openList.set(JSON.stringify(to), g + 1);
        }
      }
    }

    // {
    //   let v = target;
    //   while (JSON.stringify(v) !== JSON.stringify(origin)) {
    //     pa.push(v);
    //     v = p[v.q][v.r];
    //   }
    //   pa.push(v);
    // }
    return [ani, pa];
  }

  function runAlgo(algo) {
    let ani = [],
      pa = [];

    if (algo === "dijkstra") [ani, pa] = dijkstra();
    if (algo === "bfs") [ani, pa] = bfs();
    if (algo === "dfs") [ani, pa] = dfs();
    if (algo === "astar") [ani, pa] = astar();
    return [ani, pa];
  }

  // return [animation, path, runAlgo];
  return runAlgo;
};

export default useAlgorithms;
