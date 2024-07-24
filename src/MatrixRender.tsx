import { Array2D } from "./Matrix";

interface MatrixRenderParams {
  matrix: Array2D;
}

function MatrixRender({matrix}: MatrixRenderParams) {
  return(
    matrix.map((row, indexRow=1) => {
      return(
        <div key={indexRow}>
          {row.map((item) => {
            return(
              <div>
                {item}
              </div>
            );
          })}
        </div>
      );
    })
  );
}

export default MatrixRender;