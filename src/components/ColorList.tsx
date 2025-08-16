import type { Dispatch, SetStateAction } from "react";
import type { ColorStop } from "../lib/types";
import { X } from "lucide-react";
import { isValidHex } from "../lib/utils";

interface ColorListProps {
  colorStops: ColorStop[];
  setColorStops: Dispatch<SetStateAction<ColorStop[]>>;
}

export const ColorList = ({ colorStops, setColorStops }: ColorListProps) => {
  const removeStop = (stopId: number) => {
    if (colorStops.length > 2) {
      setColorStops((prev) => prev.filter((stop) => stop.id !== stopId));
    }
  };

  return (
    <div className="flex h-48 flex-col gap-4 overflow-auto pr-5">
      <p className="text-2xl font-bold">Color List</p>

      <div className="flex flex-col gap-2">
        {colorStops.map((stop) => (
          <div
            key={stop.id}
            className="flex items-center justify-between rounded-xl border-2 border-neutral-200 bg-neutral-100 p-3"
          >
            <div
              className="h-8 w-8 rounded-lg"
              style={{
                backgroundColor: isValidHex(stop.color)
                  ? stop.color
                  : "#FFFFFF",
              }}
            ></div>
            <input
              value={stop.color}
              onChange={(e) => {
                setColorStops((prev) =>
                  prev.map((s) =>
                    s.id === stop.id ? { ...s, color: e.target.value } : s,
                  ),
                );
              }}
              className="focus mx-4 flex-1 rounded border border-neutral-200 bg-white px-4 py-2 transition-all focus:outline-3 focus:outline-black"
            />
            <button
              onClick={() => removeStop(stop.id)}
              className={`${colorStops.length <= 2 ? "cursor-not-allowed text-gray-400" : "cursor-pointer"} transition-colors`}
            >
              <X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
