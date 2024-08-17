import { useEffect, useState } from "react";
import MatrixInput from "./MatrixInput";
import MatrixRender from "./MatrixRender";

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
    // TODO make it so that when it changes sizes it can keep it's values
    setMatrix(Array.from({length: row}, () => Array(col).fill(0)));
  }, [row, col])

  return(
    <>
      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      <MatrixRender matrix={matrix} />
    </>
  );
}

export default Matrix;