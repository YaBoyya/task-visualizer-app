import React, { useState } from "react";

export interface InputTaskCountParams {
  setTaskCount: React.Dispatch<React.SetStateAction<number>>;
}

function InputTaskCount({setTaskCount}: InputTaskCountParams){
  // TODO add input error messages
  const checkValue = (num: number) => {
    if (isNaN(num) || num <= 1) {
      return 2;
    }
    if (num > 12) {
      return 12;
    }
    return num;
  }

  return (
    <>
      <label className="p-2 text-xl">Task count:</label>
      <input
        className="py-1 px-2 rounded-lg font-normal"
        type="number"
        defaultValue={2}
        onChange={e => {
          const tasks = checkValue(parseInt(e.target.value));
          setTaskCount(tasks);
        }}
      />
    </>
  );
}

export default InputTaskCount;