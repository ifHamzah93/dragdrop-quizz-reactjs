import { useState, useRef } from "react";
import { Card, DragItem } from "./DragItem";
import { motion } from "framer-motion";
import "./app.scss";

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

function App() {
  const dropConstraintsRef = useRef<HTMLDivElement[]>([]);
  const [dropPositions, setDropPositions] = useState(new Array(3).fill(null));

  function setDropPosition(ref: HTMLDivElement | null, activeIndex: number) {
    setDropPositions((prev) =>
      [...prev].map((item, idx) => (idx === activeIndex ? ref : item))
    );
  }

  return (
    <div className="App">
      <div className="drag-and-drop">
        <div className="row drag-and-drop-container">
          <div className="col drop-wrapper">
            {dropPositions.map((_, idx) => (
              <motion.div
                key={idx}
                className="drop-container"
                ref={(el) => {
                  if (el) return (dropConstraintsRef.current[idx] = el);
                }}
              >
                {dropPositions[idx] !== null && (
                  <Card title={items[dropPositions[idx]]} />
                )}
              </motion.div>
            ))}
          </div>
          <div className="col drag-wrapper">
            {items.map((item, idx) => (
              <DragItem
                item={item}
                key={idx}
                cardIndex={idx}
                dropConstraintsRef={dropConstraintsRef}
                dropPositions={dropPositions}
                setDropPosition={setDropPosition}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
