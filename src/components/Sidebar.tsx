import Button from "./Button";
import { SidebarProps } from "../props";

function Sidebar({isSidebarOpen, setIsSidebarOpen, onSubmitClick, children}: SidebarProps) {
  const toggleVisibility = () => setIsSidebarOpen((curr: Boolean) => !curr);

  return (
    <>
      <div className={`flex ${isSidebarOpen ? "w-fit" : "w-0"} fixed h-screen z-10`}>
        <span className={`w-full absolute transition-transform ease-in-out ${isSidebarOpen ? "translate-x-full" : "translate-x-0"}`}>
          <span onClick={toggleVisibility}>
            <button className="bg-tertiary h-[100px] rounded-r-xl hover:bg-accent">
              <svg viewBox="0 0 1024 1024" height="20" width="40" fill="#DDD" className={`${isSidebarOpen ? "rotate-90" : "-rotate-90"} transition-transform ease-in-out delay-100`}>
                <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path>
              </svg>
            </button>
          </span>
        </span> 
        <aside className={`bg-backgroundSecondary font-semibold w-fit h-full px-4 py-2 transition-transform ease-in-out ${isSidebarOpen ? "" : "-translate-x-full"}`}>
          <div className="flex flex-1 items-center">
            <h1 className="flex-grow text-3xl p-2">Visualizer Configuration</h1>
              <Button onClick={onSubmitClick}>
                Submit
              </Button>
          </div>
          {children}            
        </aside>
      </div>
    </>
  );
}

export default Sidebar;