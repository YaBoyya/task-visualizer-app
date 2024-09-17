function Navbar({children}: any){
  return (
    <div className="container min-w-full border-b border-slate-600 border-solid text-slate-300">
      <ul className="flex content-center p-5">
        <li className="font-bold text-xl mr-5">
          task-visualizer-app
        </li>
        <li className="text-xl mr-5">
          Home
        </li>
        {/* TODO remove later point, for test purposes only */}
        <li className="text-xl">
          {children}
        </li>
      </ul>
    </div>
  );
}

export default Navbar