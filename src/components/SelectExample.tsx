import { taskExamples } from "../examples";
import { SelectProps } from "../props";

function SelectExample({value, setValue}: SelectProps) {
  return(
    <div className="flex flex-row content-center place-content-between max-w-[475px] py-2">
      <label className="text-xl p-2">Example inputs:</label>
      <select
        className="w-[200px] bg-white py-1 px-2 rounded-lg font-normal"
        // TODO
        onChange={(event: any) => setValue(event.target.value)}
        value={value}
      >
        <option value="">
          Own input
        </option>
        {Object.keys(taskExamples).map((el: string, i: number) => (
          <option key={i} value={el}>
            {el[0].toUpperCase() + el.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectExample;