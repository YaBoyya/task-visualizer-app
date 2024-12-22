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
      {matrix.map((row, indexRow) => {
        return(
          <div key={indexRow} className="flex flex-row flex-nowrap place-content-center font-normal">
            {row.map((val, indexColumn) => {
              return(
                <input
                  className="max-w-10 m-1 rounded-md text-center"
                  key={indexRow + " " + indexColumn}
                  type="text"
                  value={val}
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