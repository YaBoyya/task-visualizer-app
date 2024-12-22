function NumberInput({label, value, callback, step=1}: any){
  return (
    <div className="flex flex-row content-center place-content-between max-w-[450px] py-2">
      <label className="text-xl p-2">{label}</label>
      <input
        className="w-[200px] py-1 px-2 rounded-lg font-normal"
        type="number"
        value={value}
        step={step}
        onChange={e => callback(e.target.value)}
      />
    </div>
  );
}

export default NumberInput;