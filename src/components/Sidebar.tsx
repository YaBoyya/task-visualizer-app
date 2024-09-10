import { useState } from "react";

// TODO fix typing
function Sidebar({children}: any) {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => setVisible(curr => !curr);

  return (
    <>
      <div className="flex w-[50%] fixed left-0 h-screen z-10">
        <button 
          className={`absolute p-2 bg-white top-[50%] rounded-r ${visible ? "right-0 translate-x-full" : "left-0"}`}
          onClick={toggleVisibility}
        >
          {visible ? "<" : ">"}
        </button>
        <aside className={`w-[100%] bg-slate-300 ${visible ? "" : "-translate-x-full"}`}>
          
          <h1 className="text-white text-4xl">Sidebar</h1>
          {children}
        </aside>
      </div>
    </>
  );
}

export default Sidebar;