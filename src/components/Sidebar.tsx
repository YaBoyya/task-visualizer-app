import React, { useEffect } from "react";

interface SidebarProps {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  children: React.ReactNode;
}

// TODO fix typing
function Sidebar({isSidebarOpen, setIsSidebarOpen, children}: SidebarProps) {
  const toggleVisibility = () => setIsSidebarOpen((curr: Boolean) => !curr);
  useEffect(() => {
    setIsSidebarOpen(true)
  }, [])
  console.log(isSidebarOpen)
//TODO connect button to the transition
  return (
    <>
      <div className="flex w-[50%] fixed left-0 h-screen z-10">
        <span className={`w-full h-full absolute transition-transform ease-in-out delay-300 ${isSidebarOpen ? "translate-x-full" : "translate-x-0"}`}>
          <button 
            className={`absolute p-2 bg-white top-[50%] rounded-r`}
            onClick={toggleVisibility}
          >
            {isSidebarOpen ? "<" : ">"}
          </button>
        </span> 
        <aside className={`w-[100%] bg-slate-300 transition-transform ease-in-out delay-300 ${isSidebarOpen ? "" : "-translate-x-full"}`}>
          <h1 className="text-white text-4xl">Sidebar</h1>
          {children}
        </aside>
      </div>
    </>
  );
}

export default Sidebar;