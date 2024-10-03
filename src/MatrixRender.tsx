import { MatrixRenderProps } from "./props";

function MatrixRender({matrix}: MatrixRenderProps) {
  return(
    <div className="matrix">
      {matrix.map((row, indexRow) => {
          return(
            <div className="matrix-row" key={indexRow}>
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
      }
    </div>
  );
}

export default MatrixRender;