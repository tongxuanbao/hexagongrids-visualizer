import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ControlPanel = (props) => {
  const {
    algo,
    onAlgoChanged,
    executeAlgo,
    clearAnimation,
    realTime,
    setRealTime,
    setInfoModal,
    algoRunning,
    // setAlgoRunning,
  } = props;

  function handleToggle(event) {
    clearAnimation();
    setRealTime(event.target.checked);
    executeAlgo();
  }

  function handleRunAlgo(event) {
    if (algoRunning) {
      clearAnimation();
    } else {
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
          className="btYellowBig"
          disabled={realTime}
          onClick={() => handleRunAlgo()}
        >
          <strong>{algoRunning ? "Clear" : "Run"}</strong>
        </button>
        <div className="alignSelect">
          <div className="legend">Realtime</div>
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>
        <button
          className="info"
          onClick={() => {
            setInfoModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
      </div>
      {/* <InfoModal /> */}
    </div>
  );
};

export default ControlPanel;
