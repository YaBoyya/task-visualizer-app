export const updateMatrix = (source: number[][], setSource: React.Dispatch<React.SetStateAction<number[][]>>, x: number, y: number) => {
  const arr = Array.from({length: y}, () => Array(x).fill(0));
  arr.forEach((row, i) => {
    row.forEach((_, j) => {
      if (i in source && j in source[i]) {
        arr[i][j] = source[i][j];
      }
    });
  });

  setSource(arr);
}