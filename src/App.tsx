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
  const [isRadial, setIsRadial] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(90);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-6 flex w-full max-w-7xl flex-col gap-6">
        <div
          className="h-48 w-full rounded"
          style={{
            background: generateGradient(
              colorStops,
              false,
              isRadial,
              gradientAngle,
            ),
          }}
        ></div>

        <ColorRamp
          colorStops={colorStops}
          setColorStops={setColorStops}
          setSelectedStopId={setSelectedStopId}
        />

        <div className="flex items-center gap-8">
          <div className="flex items-center rounded border-2 border-neutral-300 tracking-wider">
            <button
              className={`${isRadial ? "" : "bg-neutral-200"} cursor-pointer rounded-l border-r border-neutral-400 p-2 transition-colors duration-300`}
              onClick={() => setIsRadial(false)}
            >
              Linear
            </button>
            <button
              className={`${isRadial ? "bg-neutral-200" : ""} cursor-pointer rounded-r p-2 transition-colors duration-300`}
              onClick={() => setIsRadial(true)}
            >
              Radial
            </button>
          </div>

          <div className="flex flex-1 gap-5">
            <input
              type="range"
              className="w-full max-w-lg"
              min={0}
              max={360}
              value={gradientAngle}
              onChange={(e) => setGradientAngle(parseInt(e.target.value))}
            />
            <p className="font-mono text-lg tracking-wider">{gradientAngle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:h-64 md:grid-cols-2">
          <HexColorPicker
            style={{ width: "100%", height: "calc(var(--spacing) * 64)" }}
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

        <div className="flex w-full gap-6 md:max-w-1/2 md:flex-col">
          <div className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              CSS Gradient:
            </span>
            <div className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-800 shadow-sm select-all">
              {generateGradient(colorStops, false, isRadial, gradientAngle)}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              Tailwind Gradient:
            </span>
            <div className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-800 shadow-sm select-all">
              {generateGradient(colorStops, true, isRadial, gradientAngle)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
