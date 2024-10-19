import { InputTaskCountProps } from "../props";

function InputTaskCount({taskCount, setTaskCount}: InputTaskCountProps){
  // TODO add input error messages
  const handletaskCountChange = (num: number) => {
    if (isNaN(num) || num <= 1) {
      setTaskCount(2);
      return;
    }
    if (num > 12) {
      setTaskCount(12);
      return;
    }
    setTaskCount(num);
  }

  return (
    <div className="flex flex-row content-center place-content-between max-w-[475px] py-2">
      <label className="text-xl p-2">Task count:</label>
      <input
        className="w-[200px] py-1 px-2 rounded-lg font-normal"
        type="number"
        defaultValue={taskCount}
        onChange={e => handletaskCountChange(parseInt(e.target.value))}
      />
    </div>
  );
}

export default InputTaskCount;