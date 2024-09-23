import { useEffect, useState } from "react";
import MatrixInput from "../MatrixInput";
import MatrixRender from "../MatrixRender";

export interface MatrixParams {
  row: number;
  col: number;
}

function Matrix({row, col}: MatrixParams) {
  const [matrix, setMatrix] = useState(
    Array.from(
      {length: row},
      () => Array(col).fill(0)
    )
  );

  useEffect(() => {
    // Copies old values to new array after changing dimensions
    const arr = Array.from({length: row}, () => Array(col).fill(0))
    arr.forEach((row, i) => {
      row.forEach((_, j) => {
        if (i in matrix && j in matrix[i]) {
          arr[i][j] = matrix[i][j];
        }
      })
    }) 

    setMatrix(arr);
  }, [row, col])

  return(
    <>
      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      {/* <MatrixRender matrix={matrix} /> */}
    </>
  );
}

export default Matrix;