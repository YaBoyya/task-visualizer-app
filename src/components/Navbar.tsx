import { ChildrenProps } from "../props";

function Navbar({children}: ChildrenProps){
  return (
    <div className="sticky container min-w-full bg-backgroundSecondary border-b border-secondary border-solid">
      <ul className="flex content-center p-5">
        <li className="font-bold text-xl mr-5">
          <h1>task-visualizer-app</h1>
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