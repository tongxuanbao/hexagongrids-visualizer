import ControlPanel from "./ControlPanel/ControlPanel";
import HexPresentation from "./HexGrid/HexPresentation";

const Mainbody = () => {
  return (
    <div className="Mainbody">
      <ControlPanel />
      <HexPresentation />
    </div>
  );
};

export default Mainbody;
