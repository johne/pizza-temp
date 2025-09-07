import { Graph } from "./Graph";
import { useTempData } from "./hooks";
import { Stats } from "./Stats";

export const TempGraph = () => {
  const { dataPoints } = useTempData();

  console.log(dataPoints);

  return (
    <div className="flex flex-wrap">
      <Stats dataPoints={dataPoints} />
      <Graph dataPoints={dataPoints} />
    </div>
  );
};
