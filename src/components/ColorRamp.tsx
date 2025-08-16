import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ColorStop } from "../lib/types";
import { interpolate, generateGradient } from "../lib/utils";

interface ColorRampProps {
  colorStops: ColorStop[];
  setColorStops: Dispatch<SetStateAction<ColorStop[]>>;
}

export const ColorRamp = ({ colorStops, setColorStops }: ColorRampProps) => {
  const [draggedStopId, setDraggedStopId] = useState<number | null>(null);
  const rampRef = useRef<HTMLDivElement>(null);

  const addStop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rampRef.current) return;
    const rect = rampRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let position = (x / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));

    // Find the two closest stops to the new position
    const sorted = [...colorStops].sort((a, b) => a.position - b.position);
    let left = sorted[0];
    let right = sorted[sorted.length - 1];

    for (let i = 0; i < sorted.length - 1; i++) {
      if (
        position >= sorted[i].position &&
        position <= sorted[i + 1].position
      ) {
        left = sorted[i];
        right = sorted[i + 1];
        break;
      }
    }

    // Calculate interpolation factor t between left and right
    const t =
      right.position === left.position
        ? 0
        : (position - left.position) / (right.position - left.position);

    setColorStops((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((s) => s.id)) + 1,
        position,
        color: interpolate(left.color, right.color, t),
      },
    ]);
  };

  const handleMouseDown = (id: number) => {
    setDraggedStopId(id);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggedStopId === null || !rampRef.current) return;

      const rect = rampRef.current.getBoundingClientRect();
      const x = "clientX" in e ? e.clientX : 0;
      const relX = x - rect.left;
      let position = (relX / rect.width) * 100;
      position = Math.max(0, Math.min(100, position));

      setColorStops((prev) =>
        prev.map((stop) =>
          stop.id === draggedStopId ? { ...stop, position } : stop,
        ),
      );
    },
    [draggedStopId, setColorStops],
  );

  const handleMouseUp = useCallback(() => {
    setDraggedStopId(null);
  }, []);

  useEffect(() => {
    if (draggedStopId !== null) {
      const onMove = (e: MouseEvent) => handleMouseMove(e);
      const onUp = () => handleMouseUp();
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
    }
  }, [draggedStopId, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      <div
        ref={rampRef}
        className="h-16 w-full cursor-pointer rounded-lg"
        style={{ background: generateGradient(colorStops) }}
        onClick={(e) => addStop(e)}
      ></div>

      {colorStops.map((stop) => (
        <div
          key={stop.id}
          className="absolute top-0 h-full w-4 -translate-x-[50%] cursor-all-scroll rounded-full border-2 border-black inset-ring-2 inset-ring-white"
          style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
          onMouseDown={() => handleMouseDown(stop.id)}
        ></div>
      ))}
    </div>
  );
};
