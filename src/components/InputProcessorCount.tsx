import { InputProps } from "../props";

function InputProcessorCount({value, setValue}: InputProps){
  // TODO add input error messages
  const handleChange = (num: number) => {
    if (isNaN(num) || num < 3) {
      setValue(3);
      return;
    }
    if (num > 5) {
      setValue(5);
      return;
    }
    setValue(num);
  }

  return (
    <div className="flex flex-row content-center place-content-between max-w-[475px] py-2">
      <label className="text-xl p-2">Processor count:</label>
      <input
        className="w-[200px] py-1 px-2 rounded-lg font-normal"
        type="number"
        defaultValue={value}
        onChange={e => handleChange(parseInt(e.target.value))}
      />
    </div>
  );
}

export default InputProcessorCount;