import { ColorRamp } from "./components/ColorRamp";

export const App = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-7xl">
        <ColorRamp />
      </div>
    </div>
  );
};
