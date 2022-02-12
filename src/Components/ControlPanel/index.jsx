const ControlPanel = (props) => {
  const {
    algo,
    onAlgoChanged,
    executeAlgo,
    clearAnimation,
    realTime,
    setRealTime,
  } = props;
  return (
    <div className="ControlPanel">
      <select className="algo-selection" onChange={onAlgoChanged} value={algo}>
        <option value="dijkstra">Dijkstra's Algorithm</option>
        <option value="astar">A* Search</option>
        <option value="bfs">Breadth First Search</option>
        <option value="dfs">Depth First Search</option>
      </select>
      <button onClick={() => executeAlgo()}>Run Algorithm</button>
      <button onClick={() => clearAnimation()} disabled={realTime}>
        Clear Animation
      </button>
      <button onClick={() => setRealTime(!realTime)}>{`Realtime: ${
        realTime ? "ON" : "OFF"
      }`}</button>
    </div>
  );
};

export default ControlPanel;
