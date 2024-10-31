import MatrixInput from "./MatrixInput";
import MatrixRender from "../MatrixRender";
import { MatrixInputProps } from "../props";


function Matrix({matrix, setMatrix}: MatrixInputProps) {
  return(
    <>
      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      {/* <MatrixRender matrix={matrix} /> */}
    </>
  );
}

export default Matrix;