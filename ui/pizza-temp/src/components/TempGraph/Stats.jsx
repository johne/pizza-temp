export const Stats = ({ dataPoints }) => {
  const recent = dataPoints.at(-1)?.temp0;

  const hiLow = dataPoints.reduce(
    (acc, temp) => {
      return {
        hi: Math.max(acc.hi, temp.temp0),
        low: Math.min(acc.low, temp.temp0)
      };
    },
    { hi: 0, low: 10000 }
  );

  return (
    <div className="border rounded min-w-[110px] h-[115px] p-2">
      <div className="">Oven</div>
      <div className="flex gap-2 w-full">
        <div>Now</div>
        <div className="text-right w-full">{Math.round(recent)}° f</div>
      </div>
      <div className="flex gap-2">
        <div>High</div>
        <div className="text-right w-full">{Math.round(hiLow.hi)}° f</div>
      </div>
      <div className="flex gap-2">
        <div>Low</div>
        <div className="text-right w-full">{Math.round(hiLow.low)}° f</div>
      </div>
    </div>
  );
};
