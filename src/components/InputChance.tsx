import { InputProps } from "../props";

function InputChance({value, setValue}: InputProps) {
  const checkChance = (val: number) => {
    return val;
  }

  return (
    <div className="flex flex-row content-center place-content-between max-w-[475px] py-2">
      <label className="text-xl p-2">Task change chance:</label>
      <input
        className="w-[200px] py-1 px-2 rounded-lg font-normal"
        type="number"
        step="0.01"
        defaultValue={value}
        onChange={e => setValue(checkChance(parseInt(e.target.value)))}
      />
    </div>
  );
}

export default InputChance;