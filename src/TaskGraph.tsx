import { useEffect, useState } from "react";
import MatrixInput from "./MatrixInput";
import MatrixRender from "./MatrixRender";

export interface TaskGraphParams {
  taskCount: number;
}

function TaskGraph({taskCount}: TaskGraphParams) {
  const [matrix, setMatrix] = useState(
    Array.from(
      {length: taskCount},
      () => Array(taskCount).fill(0)
    )
  );

  useEffect(() => {
    // TODO make it so that when it changes sizes it can keep it's values
    setMatrix(Array.from({length: taskCount}, () => Array(taskCount).fill(0)));
  }, [taskCount])

  return(
    <>
      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      <MatrixRender matrix={matrix} />
    </>
  );
}

export default TaskGraph;