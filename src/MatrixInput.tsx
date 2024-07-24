import React from "react";
import { MatrixSizeParams } from "./MatrixInputSize";
import { Array2D } from "./Matrix";

export interface MatrixInputParams {
  matrixSize: MatrixSizeParams;
  matrix: Array2D;
  setMatrix: React.Dispatch<React.SetStateAction<Array2D>>;
}

function MatrixInput({matrixSize, matrix, setMatrix}: MatrixInputParams) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let count = 0;
    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.columns; j++) {
        matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
        count += 1;
      }
    }
    setMatrix(matrix)
  }

  return(
    <>
      {/* TODO maybe make better separation between cells */}
      <form onSubmit={handleSubmit}>
        {matrix.map((row, indexRow=1) => {
          return(
            <div key={indexRow}>
              {row.map((_, indexColumn=1) => {
                return(
                  <input
                    key={indexRow + " " + indexColumn}
                    type="text"
                    defaultValue={0}
                    name={indexRow + "," + indexColumn}
                  />
                );
              })}
            </div>
          );
        })}
        <button>Save</button>
      </form> 
    </>
  );
}

export default MatrixInput