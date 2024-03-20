import { useEffect, useRef, useState } from "react";
import "./dragItem.scss";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { DragItemTypes } from "./types";

export function Card({ title }: { title: string }) {
  return (
    <motion.div layout className="card">
      <h5>{title}</h5>
    </motion.div>
  );
}

export function DragItem({
  item,
  cardIndex,
  dropConstraintsRef,
  dropPositions,
  setDropPosition,
}: DragItemTypes) {
  const dragRef = useRef(null);
  const [isDropped, setIsDropped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  function handleDragStart() {
    setIsDragging(true);
    setZIndex(2);
  }

  function handleDragEnd(e: DragEvent) {
    if (!dropConstraintsRef.current) return;

    setIsDragging(false);

    const eventTarget = e.target as HTMLDivElement;
    if (!eventTarget) return;

    const droppedElPosition = [
      eventTarget.getBoundingClientRect().left + eventTarget.offsetWidth / 2,
      eventTarget.getBoundingClientRect().top + eventTarget.offsetHeight / 2,
    ];

    const currentEl: HTMLDivElement = dropConstraintsRef.current.find((el) => {
      const { left, top, right, bottom } = el.getBoundingClientRect();
      return (
        left < droppedElPosition[0] &&
        top < droppedElPosition[1] &&
        right > droppedElPosition[0] &&
        bottom > droppedElPosition[1]
      );
    })!;

    const dropRefIdx = dropConstraintsRef.current.indexOf(currentEl);
    if (dropRefIdx >= 0 && !dropPositions[dropRefIdx]) {
      setDropPosition(cardIndex, dropRefIdx);
      setIsDropped(true);
    }
  }

  // if all cards can be dropped:
  useEffect(() => {
    if (!dropPositions.includes(cardIndex)) {
      setIsDropped(false);
    }
  }, [dropPositions, cardIndex]);

  const x = useMotionValue(0);
  useMotionValueEvent(x, "animationComplete", () => {
    setZIndex(1);
  });

  return (
    <motion.div
      className="drag-item"
      ref={dragRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        zIndex,
      }}
    >
      <div>
        <motion.div
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragElastic={1}
          style={{
            x,
            display: isDropped ? "none" : "block",
            scale: isDragging ? 0.8 : 1,
          }}
        >
          <Card title={item} />
        </motion.div>
      </div>
    </motion.div>
  );
}
