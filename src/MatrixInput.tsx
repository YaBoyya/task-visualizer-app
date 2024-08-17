import React from "react";

export interface MatrixInputParams {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

function MatrixInput({matrix, setMatrix}: MatrixInputParams) {
  const handleCellChange = (event: any, row: number, col: number) => {
    let val = event.target.value;

    setMatrix((prev) => {
      const matrix = [...prev];
      // TODO add an error for invalid values?
      matrix[row][col] = !isNaN(parseFloat(val)) && parseFloat(val) > 0 ? parseFloat(val) : 0;
      return matrix;
    })
  }

  return(
    <>
      {/* TODO maybe make better separation between cells */}
      {matrix.map((row, indexRow) => {
        return(
          <div key={indexRow}>
            {row.map((_, indexColumn) => {
              return(
                <input
                  key={indexRow + " " + indexColumn}
                  type="text"
                  // defaultValue={0} //TODO rethink this 
                  name={indexRow + "," + indexColumn}
                  onChange={(e) => handleCellChange(e, indexRow, indexColumn)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default MatrixInput