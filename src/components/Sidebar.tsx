import React, { useEffect } from "react";
import Button from "./Button";

interface SidebarProps {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  children: React.ReactNode;
}

function Sidebar({isSidebarOpen, setIsSidebarOpen, children}: SidebarProps) {
  const toggleVisibility = () => setIsSidebarOpen((curr: Boolean) => !curr);
  useEffect(() => {
    setIsSidebarOpen(true)
  }, [])
// TODO find a way to hide width change in root div, to see it increase aside dilay
  return (
    <>
      <div className={`flex ${isSidebarOpen ? "w-fit" : "w-0"} fixed h-screen z-10`}>
        <span className={`w-full absolute transition-transform ease-in-out ${isSidebarOpen ? "translate-x-full" : "translate-x-0"}`}>
          <span onClick={toggleVisibility}>
            <Button>
              {isSidebarOpen ? "<" : ">"}
            </Button>
          </span>
        </span> 
        <aside className={`bg-backgroundSecondary font-semibold w-fit h-full px-4 py-2 transition-transform ease-in-out ${isSidebarOpen ? "" : "-translate-x-full"}`}>
          <div className="flex flex-1 items-center">
            <h1 className="flex-grow text-3xl p-2">Visualizer Configuration</h1>
              <Button>
                Submit {"->"}
              </Button>
          </div>
          {children}            
        </aside>
      </div>
    </>
  );
}

export default Sidebar;