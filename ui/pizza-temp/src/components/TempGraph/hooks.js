import { useState, useEffect } from "react";
const baseAddress = "http://pizza-temp.local:3000";
const INTERVAL = 15000;
const MAX_DATA = 4 * 60 * 5;
const INITIAL_LOAD = 60 * 60 * 5;
const STORAGE_KEY = "jde-pizza-oven-temp-history";

const removeMax = dataPoints => {
  if (dataPoints.length > MAX_DATA) {
    console.log("slicing");
    return dataPoints.slice(dataPoints.length - MAX_DATA);
  }

  return dataPoints;
};

export const useTempData = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${baseAddress}/current`, { method: "GET" })
        .then(res => res.json())
        .then(res =>
          setDataPoints(dataPoints => [
            ...removeMax(dataPoints),
            { ...res, time: new Date() }
          ])
        );
    }, INTERVAL);

    fetch(`${baseAddress}/history?secondsBack=${INITIAL_LOAD}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res =>
        setDataPoints(
          res.map(temps => ({ ...temps, time: new Date(temps.time * 1000) }))
        )
      );

    return () => {
      clearInterval(intervalId);
    };
  }, [setDataPoints]);

  console.log(dataPoints.map(a => a));

  return { dataPoints };
};
