import { useState, useEffect } from "react";
const address = "http://pizza-temp.local:3000/current";
const INTERVAL = 10000;
const MAX_DATA = 10; //6 * 60 * 5; // 5 hours of data
const STORAGE_KEY = "jde-pizza-oven-temp-history";

const removeMax = dataPoints => {
  if (dataPoints.length > MAX_DATA) {
    console.log("slicing");
    return dataPoints.slice(dataPoints.length - MAX_DATA);
  }

  return dataPoints;
};

const getStoredHistory = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  const history = storedValue !== null ? JSON.parse(storedValue) : [];

  return history
    .map(temp => ({ ...temp, time: new Date(temp.time) }))
    .filter(
      temp => temp.time.getTime() > new Date().getTime() - INTERVAL * MAX_DATA
    );
};

export const useTempData = () => {
  const [dataPoints, setDataPoints] = useState(getStoredHistory);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(address, { method: "GET" })
        .then(res => res.json())
        .then(res =>
          setDataPoints(dataPoints => [
            ...removeMax(dataPoints),
            { ...res, time: new Date() }
          ])
        );
    }, INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataPoints));
  }, [dataPoints]);

  console.log(dataPoints.map(a => a));

  return { dataPoints };
};
