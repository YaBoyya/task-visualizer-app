import { useState } from "react";
import MatrixInputSize from "./MatrixInputSize";

function Matrix() {
  const [matrixSize, setMatrixSize] = useState({
    rows: 2,
    columns: 2, 
  })

  return(
    <>
      <MatrixInputSize setMatrixSize={setMatrixSize} />
      {matrixSize.rows} {matrixSize.columns}
    </>
  );
}

export default Matrix;