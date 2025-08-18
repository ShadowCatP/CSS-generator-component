import { useState } from "react";
import { ColorRamp } from "./components/ColorRamp";
import type { ColorStop } from "./lib/types";
import { generateGradient } from "./lib/utils";
import { ColorList } from "./components/ColorList";
import { HexColorPicker } from "react-colorful";

export const App = () => {
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: 1, position: 0, color: "#833AB4" },
    { id: 2, position: 100, color: "#FCB045" },
  ]);
  const [selectedStopId, setSelectedStopId] = useState(1);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-6 flex w-full max-w-7xl flex-col gap-6">
        <ColorRamp
          colorStops={colorStops}
          setColorStops={setColorStops}
          setSelectedStopId={setSelectedStopId}
        />

        <div className="grid h-64 grid-cols-2 items-center gap-8">
          <HexColorPicker
            style={{ width: "100%", height: "100%" }}
            color={
              colorStops.find((stop) => stop.id === selectedStopId)?.color ??
              "#FFF"
            }
            onChange={(color) => {
              setColorStops((prevStops) =>
                prevStops.map((stop) =>
                  stop.id === selectedStopId
                    ? { ...stop, color: color.toUpperCase() }
                    : stop,
                ),
              );
            }}
          />

          <ColorList
            colorStops={colorStops}
            setColorStops={setColorStops}
            selectedStopId={selectedStopId}
            setSelectedStopId={setSelectedStopId}
          />
        </div>

        <div className="flex max-w-1/2 flex-col gap-6">
          <div className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              CSS Gradient:
            </span>
            <div className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-800 shadow-sm select-all">
              {generateGradient(colorStops)}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              Tailwind Gradient:
            </span>
            <div className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-800 shadow-sm select-all">
              {generateGradient(colorStops, true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
