import { InputProps } from "../props";

function InputTaskCount({value, setValue}: InputProps){
  // TODO add input error messages
  const handleTaskCountChange = (num: number) => {
    if (isNaN(num) || num <= 1) {
      setValue(2);
      return;
    }
    if (num > 12) {
      setValue(12);
      return;
    }
    setValue(num);
  }

  return (
    <div className="flex flex-row content-center place-content-between max-w-[475px] py-2">
      <label className="text-xl p-2">Task count:</label>
      <input
        className="w-[200px] py-1 px-2 rounded-lg font-normal"
        type="number"
        value={value}
        onChange={e => handleTaskCountChange(parseInt(e.target.value))}
      />
    </div>
  );
}

export default InputTaskCount;