const pixelsPerBottle = 11;

const bottle1 = 139;
// const bottle1 = 0;

const skipIndexes = new Array(15).fill("").map((_, i) => i * 23 + 22);

// const order = new Array(31).fill("").map((_, i) => i + 1);

const order = [
  1, 3, 4, 5, 6, 15, 7, 8, 9, 10, 11, 13, 14, 16, 17, 20, 21, 22, 23, 24, 12,
  25, 26, 27, 28, 29, 30, 31, 19, 18, 2
];

let skipped = 0;

const lightIndexes = new Array(31).fill("").map((_, i) => {
  if (skipIndexes.includes(i * pixelsPerBottle + skipped)) {
    skipped++;
  }

  return new Array(pixelsPerBottle)
    .fill("")
    .map((_, j) => i * pixelsPerBottle + j + skipped);
});

const empty = new Array(bottle1).fill("");

const newMap = empty.map((_, i) => i);

order.forEach(i => {
  const newVals = lightIndexes.at(i - 1).map(i => i + bottle1);
  newMap.push(...newVals);
});

newMap.push(...skipIndexes.map(ind => ind + bottle1));

console.log(JSON.stringify({ map: newMap }));
