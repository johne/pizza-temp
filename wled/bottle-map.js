const pixelsPerBottle = 11;

// const bottle1 = 156;
const bottle1 = 0;

const skipIndexes = new Array(15).fill("").map((_, i) => i * 23 + 11);

// const order = [
//   1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25,
//   12, 26, 27, 28, 29, 30, 31, 19, 18, 2
// ];

const order = [
  1, 3, 4, 5, 6, 15, 7, 8, 9, 10, 11, 13, 14, 16, 17, 20, 21, 22, 23, 24, 12,
  25, 26, 27, 28, 29, 30, 31, 19, 18, 2
];

const empty = new Array(bottle1).fill("");

const newMap = empty.map((_, i) => i);

let skipped = 0;

order.forEach(i => {
  const newVals = new Array(pixelsPerBottle)
    .fill("")
    .map((_, j) => (i - 1) * pixelsPerBottle + j + bottle1 + skipped);
  newMap.push(...newVals);

  if (skipIndexes.includes(i + pixelsPerBottle + skipped)) {
    skipped++;
  }
});

console.log(JSON.stringify({ map: newMap }));
