import React from "react";

export interface InputTaskCountParams {
  setTaskCount: React.Dispatch<React.SetStateAction<number>>;
}

function InputTaskCount({setTaskCount}: InputTaskCountParams){
  const checkValue = (num: number) => {
    if (isNaN(num) || num < 1) {
      return 1
    }
    return num;
  }

  return (
    <form>
      <input
        type="number"
        defaultValue={2}
        onChange={e => {
          const tasks = checkValue(parseInt(e.target.value));
          setTaskCount(tasks);
        }}
      />
    </form>
  );
}

export default InputTaskCount;