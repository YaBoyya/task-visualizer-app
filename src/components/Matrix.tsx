import MatrixRender from "../MatrixRender";
import { MatrixProps } from "../props";


function Matrix({matrix, setMatrix}: MatrixProps) {
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
    <div className="flex flex-col ">
      {/* TODO maybe make better separation between cells */}
      {matrix.map((row, indexRow) => {
        return(
          <div key={indexRow} className="flex flex-row flex-nowrap place-content-center font-normal">
            {row.map((_, indexColumn) => {
              return(
                <input
                  className="max-w-10 m-1 rounded-md text-center"
                  key={indexRow + " " + indexColumn}
                  type="text"
                  // TODO Make it placeholder?
                  defaultValue={0}
                  name={indexRow + "," + indexColumn}
                  onChange={(e) => handleCellChange(e, indexRow, indexColumn)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Matrix;