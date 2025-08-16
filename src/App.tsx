import { useState } from "react";
import { ColorRamp } from "./components/ColorRamp";
import type { ColorStop } from "./lib/types";
import { generateGradient } from "./lib/utils";
import { ColorList } from "./components/ColorList";

export const App = () => {
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: 1, position: 0, color: "#833AB4" },
    { id: 2, position: 100, color: "#FCB045" },
  ]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-6 flex w-full max-w-7xl flex-col gap-6">
        <ColorRamp colorStops={colorStops} setColorStops={setColorStops} />

        <div className="grid grid-cols-2">
          <ColorList colorStops={colorStops} setColorStops={setColorStops} />
        </div>

        <div className="flex flex-col items-start">
          <span className="mb-2 font-semibold text-gray-700">
            CSS Gradient:
          </span>
          <div
            className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-800 shadow-sm select-all"
            style={{ maxWidth: 600 }}
          >
            {generateGradient(colorStops)}
          </div>
        </div>
      </div>
    </div>
  );
};
