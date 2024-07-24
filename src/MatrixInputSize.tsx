import React from "react";

export interface MatrixSizeParams {
  rows: number;
  columns: number;
}

export interface MatrixInputSizeParams {
  setMatrixSize: React.Dispatch<React.SetStateAction<MatrixSizeParams>>;
}

function MatrixInputSize({setMatrixSize}: MatrixInputSizeParams){
  const checkValue = (num: number) => {
    if (isNaN(num) || num < 1) {
      num = 1
    }
    return num;
  }

  return (
    <form>
      {/* TODO perhaps iterate over list of inputs? */}
      <input
        type="number"
        defaultValue={2}
        onChange={e => {
          const rows = checkValue(parseInt(e.target.value))
          setMatrixSize((prevSize: any) => ({
            ...prevSize,
            rows: rows,
          }))
        }}
      />
      <input
        type="number"
        defaultValue={2}
        onChange={e => {
          const columns = checkValue(parseInt(e.target.value))
          setMatrixSize((prevSize: any) => ({
            ...prevSize,
            columns: columns,
          }))
        }}
      />
    </form>
  );
}

export default MatrixInputSize;