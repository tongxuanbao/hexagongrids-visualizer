import { useState } from "react";

const ControlPanel = (props) => {
  const {
    algo,
    onAlgoChanged,
    executeAlgo,
    clearAnimation,
    realTime,
    setRealTime,
  } = props;

  const [algoRunning, setAlgoRunning] = useState(false);

  function handleToggle(event) {
    if (!event.target.checked) clearAnimation();
    setRealTime(event.target.checked);
  }

  function handleRunAlgo(event) {
    if (algoRunning) {
      setAlgoRunning(false);
      clearAnimation();
    } else {
      setAlgoRunning(true);
      executeAlgo();
    }
  }

  return (
    <div className="controlPanel">
      <div className="title">
        <h3>Hexagon Visualizer</h3>
      </div>
      <div className="content">
        <div className="alignSelect">
          <div className="legend">Algorithms</div>
          <label className="select">
            <select
              className="algo-selection"
              onChange={onAlgoChanged}
              value={algo}
            >
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">A*</option>
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
            </select>
          </label>
        </div>
        <button
          className="runAlgo"
          disabled={realTime}
          onClick={() => handleRunAlgo()}
        >
          {algoRunning ? "Clear Algorithm" : "Run Algorithm"}
        </button>
        <div className="alignSelect">
          <div className="legend">Realtime</div>
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        {/* <button onClick={() => setRealTime(!realTime)}>
          {realTime && <b>{"Realtime: ON"}</b>}
          {!realTime && "Realtime: OFF"}
        </button> */}
        {/* <button onClick={() => clearAnimation()} disabled={realTime}>
          Clear Animation
        </button> */}
      </div>
    </div>
  );
};

export default ControlPanel;
