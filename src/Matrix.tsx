import { useEffect, useState } from "react";
import MatrixInputSize from "./MatrixInputSize";
import MatrixInput from "./MatrixInput";
import MatrixRender from "./MatrixRender";

export interface Array2D extends Array<number []>{
  [row: number]: number[];
}

function Matrix() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2, 
  })
  const [matrix, setMatrix] = useState(Array.from({length: matrixSize.rows}, () => Array(matrixSize.columns).fill(0)));

  useEffect(() => {
    setMatrix(matrix)
  }, matrix)

  return(
    <>
      <MatrixInputSize setMatrixSize={setMatrixSize} />
      {matrixSize.rows} {matrixSize.columns}
      <MatrixInput matrixSize={matrixSize} matrix={matrix} setMatrix={setMatrix} />
      <MatrixRender matrix={matrix} />
    </>
  );
}

export default Matrix;