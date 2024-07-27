import { useEffect, useState } from "react";
import MatrixInputSize from "./MatrixInputSize";
import MatrixInput from "./MatrixInput";
import MatrixRender from "./MatrixRender";

function Matrix() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2, 
  })

  const [matrix, setMatrix] = useState(
    Array.from(
      {length: matrixSize.rows},
      () => Array(matrixSize.columns).fill(0)
    )
  );

  useEffect(() => {
    // TODO make it so that when it changes sizes it can keep it's values
    setMatrix(Array.from({length: matrixSize.rows}, () => Array(matrixSize.columns).fill(0)));
  }, [matrixSize])

  return(
    <>
      <MatrixInputSize setMatrixSize={setMatrixSize} />
      {matrixSize.rows} {matrixSize.columns}
      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      <MatrixRender matrix={matrix} />
    </>
  );
}

export default Matrix;