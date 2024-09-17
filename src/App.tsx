import { useState } from "react";
// import './App.css'
import InputTaskCount from "./InputTaskCount";
import Matrix from './Matrix'
import MC_DZZZ from './MC_DZZZ'
import TimelineChart from "./TimelineChart";
import BackgrounContainer from "./components/BackgroundContainer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


const taskGraph = [
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 0
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], // 8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
]

const taskSpecification = [
// czas wykonania zadania, liczba żądanych procesorów, najpóźniejszy możliwy termin zakończenia zadania 
// pi, ai, Di
  [30, 3, 195], // 0
  [10, 2, 155], // 1
  [5,  1, 30],   // 2
  [10, 3, 80], // 3
  [15, 1, 105], // 4
  [20, 1, 110], // 5
  [25, 3, 135], // 6
  [25, 1, 25], // 7
  [10, 1, 50], // 8
  [20, 2, 90], // 9
  [20, 3, 40], // 10
  [10, 2, 20], // 11
  [20, 3, 60]  // 12
];
const n = taskGraph.length; // task count
const m = 3; // processor count
BackgrounContainer
function App() {
  const [taskCount, setTaskCount] = useState<number>(2);
  const [isSidebarOpen, setIsSidebarOpen] = useState<Boolean>(true);

  return (
    <BackgrounContainer>
      <Navbar>
        <button onClick={() => MC_DZZZ(taskGraph, taskSpecification, n, m)}>
          Hardcoded Algo!
        </button>
      </Navbar>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className='container'>
          <div className="main-input">
            <InputTaskCount
              setTaskCount={setTaskCount} 
            />
            Task count: {taskCount}
          </div>
          <div className="matrix-inputs">
            <div className="graph">
              <h4>Task Graph</h4>
              <Matrix 
                row={taskCount}
                col={taskCount}
              />
            </div>
            <div className="specification">
              <h4>Task Specification</h4>
              <Matrix
                row={taskCount}
                col={3}
              />
            </div>
          </div>
        </div>
      </Sidebar>

      <div className={`z-0 transition-filter ease-in-out delay-300 ${isSidebarOpen ? "blur-sm pointer-events-none" : ""}`}>
        <TimelineChart />
      </div>
    </BackgrounContainer>
  )
}

export default App
