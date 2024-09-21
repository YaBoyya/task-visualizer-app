import React, { useEffect } from "react";

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

  return (
    <>
      <div className="flex w-[50%] fixed h-screen z-10">
        <span className={`w-full h-full absolute transition-transform ease-in-out delay-300 ${isSidebarOpen ? "translate-x-full" : "translate-x-0"}`}>
          <button 
            className={`absolute p-2 bg-white top-[50%] rounded-r`}
            onClick={toggleVisibility}
          >
            {isSidebarOpen ? "<" : ">"}
          </button>
        </span> 
        <aside className={`font-semibold w-[100%] h-full bg-slate-300 transition-transform ease-in-out delay-300 ${isSidebarOpen ? "" : "-translate-x-full"}`}>
          <div className="flex flex-1">
            <h1 className="flex-grow text-white text-center text-3xl p-2">Visualizer Configuration </h1>
            <button className="p-2 m-2 bg-green-300">
                Submit {"->"}
            </button>
          </div>
          {children}            
        </aside>
      </div>
    </>
  );
}

export default Sidebar;