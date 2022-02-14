import { useContext, useState } from "react";
import { HexUtils } from "../../HexagonGrids";
import { GridContext } from "../../App";
import "../../Styles/Mainbody.css";

// const InfoModal = ({ setInfoModal }) => {
//   const { size } = useContext(GridContext);
//   const [points, setPoints] = useState(HexUtils.getStrHexCorners(size));
//   return (
//     <div className="modalBackground">
//       <div className="modalPanel">
//         <div className="infoHeader">How to guide</div>
//         <div className="Content">
//           <svg
//             width={size * 2 + 2}
//             height={size * 2 + 2}
//             viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
//             // style={{ border: "3px solid red" }}
//           >
//             <g className="hexagon origin">
//               <polygon
//                 points={points}
//                 stroke="hsl(0, 0%, 70%)"
//                 strokeWidth="1"
//               ></polygon>
//             </g>
//           </svg>
//           <p className="withMargin">: Origin</p>
//           <svg
//             width={size * 2 + 2}
//             height={size * 2 + 2}
//             viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
//             // style={{ border: "3px solid red" }}
//           >
//             <g className="target">
//               <polygon
//                 points={points}
//                 stroke="hsl(0, 0%, 70%)"
//                 strokeWidth="1"
//               ></polygon>
//             </g>
//           </svg>
//           <p className="withMargin">: Target</p>
//           <svg
//             width={size * 2 + 2}
//             height={size * 2 + 2}
//             viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
//             // style={{ border: "3px solid red" }}
//           >
//             <g className="hexagon">
//               <polygon
//                 points={points}
//                 stroke="hsl(0, 0%, 70%)"
//                 strokeWidth="1"
//               ></polygon>
//             </g>
//           </svg>
//           <p>/</p>
//           <svg
//             width={size * 2 + 2}
//             height={size * 2 + 2}
//             viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
//             // style={{ border: "3px solid red" }}
//           >
//             <g className="wall">
//               <polygon
//                 points={points}
//                 stroke="hsl(0, 0%, 70%)"
//                 strokeWidth="1"
//               ></polygon>
//             </g>
//           </svg>
//           <p className="withMargin">: Path/Wall</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfoModal;

const InfoModal = ({ setInfoModal }) => {
  const { size } = useContext(GridContext);
  const [points, setPoints] = useState(HexUtils.getStrHexCorners(size));

  return (
    <div className="modalBackground" onClick={() => setInfoModal(false)}>
      <div className="modalContainer ">
        <div className="titleCloseButton">
          <button onClick={() => setInfoModal(false)}> X </button>
        </div>
        <div className="modalBody">
          <div className="originContainer">
            <svg
              width={size * 2 + 2}
              height={size * 2 + 2}
              viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
              // style={{ border: "3px solid red" }}
            >
              <g className="hexagon origin">
                <polygon
                  points={points}
                  stroke="hsl(0, 0%, 70%)"
                  strokeWidth="1"
                ></polygon>
              </g>
            </svg>
            <p className="withMargin">: Origin</p>
          </div>
          <div className="targetContainer">
            <svg
              width={size * 2 + 2}
              height={size * 2 + 2}
              viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
              // style={{ border: "3px solid red" }}
            >
              <g className="target">
                <polygon
                  points={points}
                  stroke="hsl(0, 0%, 70%)"
                  strokeWidth="1"
                ></polygon>
              </g>
            </svg>
            <p className="withMargin">: Target</p>
          </div>
          <div className="pathWallContainer">
            <svg
              width={size * 2 + 2}
              height={size * 2 + 2}
              viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
              // style={{ border: "3px solid red" }}
            >
              <g className="hexagon">
                <polygon
                  points={points}
                  stroke="hsl(0, 0%, 70%)"
                  strokeWidth="1"
                ></polygon>
              </g>
            </svg>
            <p>/</p>
            <svg
              width={size * 2 + 2}
              height={size * 2 + 2}
              viewBox={`-${size} -${size} ${size * 2 + 2} ${size * 2 + 2}`}
              // style={{ border: "3px solid red" }}
            >
              <g className="wall">
                <polygon
                  points={points}
                  stroke="hsl(0, 0%, 70%)"
                  strokeWidth="1"
                ></polygon>
              </g>
            </svg>
            <p className="withMargin">: Path/Wall</p>
          </div>
          <div className="interactingGuide">
            Interact with the grid by <strong>Click/Dragging</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
